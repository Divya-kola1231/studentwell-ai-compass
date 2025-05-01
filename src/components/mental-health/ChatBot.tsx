
import { useState } from "react"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your AI wellness companion. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("mental-health-chat", {
        body: { message: input },
      });

      if (error) throw error;

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      toast({
        title: "Error",
        description: "Could not connect to the AI assistant. Please try again later.",
        variant: "destructive",
      });
      
      // Add fallback bot message on error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="bg-studentwell-blue-500 text-white rounded-t-lg">
        <CardTitle className="text-lg font-semibold">AI Wellness Companion</CardTitle>
        <CardDescription className="text-blue-100">
          I'm here to listen and support you
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-2 text-sm",
              message.sender === "user" && "flex-row-reverse"
            )}
          >
            {message.sender === "bot" ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-studentwell-teal-500 text-white">AI</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-studentwell-blue-500 text-white">ME</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "rounded-lg px-3 py-2 max-w-[80%]",
                message.sender === "bot"
                  ? "bg-muted"
                  : "bg-primary text-primary-foreground"
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start gap-2 text-sm">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-studentwell-teal-500 text-white">AI</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg px-3 py-2">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-studentwell-teal-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-studentwell-teal-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-studentwell-teal-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-3">
        <div className="flex w-full items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            disabled={isLoading}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
