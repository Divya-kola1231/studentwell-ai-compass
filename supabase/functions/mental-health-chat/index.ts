
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!openAIApiKey) {
      console.error('OpenAI API key is missing');
      throw new Error('OpenAI API key is not configured. Please add it to your Supabase secrets.');
    }

    console.log('Sending request to OpenAI API with message:', message);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a supportive, empathetic mental health assistant for college students. ' +
                     'Provide brief, helpful responses focusing on emotional support, stress management, ' +
                     'and coping strategies. If someone appears to be in crisis, gently suggest they seek ' +
                     'professional help. Never diagnose or replace professional mental health care. Keep ' +
                     'responses under 150 words and be warm and supportive.' 
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    // Check for non-200 response from OpenAI
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', JSON.stringify(errorData));
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('OpenAI API response received');

    // Check if the response structure is as expected
    if (!data.choices || !data.choices.length) {
      console.error('Unexpected response format:', JSON.stringify(data));
      throw new Error('Unexpected response format from OpenAI API');
    }

    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in mental-health-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'There was an error connecting to the AI personal assistant. Please try again later.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
