import { useState } from "react";
import { X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatMessages, quickReplies } from "@/lib/mockData";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function ChatDrawer({ isOpen, onClose }: ChatDrawerProps) {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-[#333333]">Easypaisa AI Assistant</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className="bg-gray-100 rounded-lg p-3 mb-4 max-w-[80%]"
            >
              <div className="flex items-center space-x-2 mb-1">
                <Bot className="w-4 h-4 text-[#A7C638]" />
                <span className="text-xs text-gray-500">Assistant</span>
              </div>
              <p className="text-sm text-[#333333]">{msg.text}</p>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left h-auto p-3 text-sm text-gray-700 hover:bg-gray-50"
              >
                {reply}
              </Button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded-full"
            />
            <Button size="sm" className="bg-[#A7C638] hover:bg-[#96B032] rounded-full p-2 w-10 h-10">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
