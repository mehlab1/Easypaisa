import { useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const aiReplies = [
  {
    trigger: "save",
    response: "Great! To save more money, try these tips:\n• Set up automatic transfers to savings\n• Use the 50/30/20 rule (50% needs, 30% wants, 20% savings)\n• Track your spending with our budget tools\n• Look for areas to reduce expenses"
  },
  {
    trigger: "spend",
    response: "I can help you manage your spending! Here are some strategies:\n• Create a monthly budget and stick to it\n• Use cash for discretionary spending\n• Wait 24 hours before making non-essential purchases\n• Set spending limits for different categories"
  },
  {
    trigger: "budget",
    response: "Let's create a smart budget together! I recommend:\n• Start with your monthly income\n• List all fixed expenses (rent, utilities, etc.)\n• Allocate 20% to savings\n• Use the remaining amount for variable expenses\n• Review and adjust monthly"
  },
  {
    trigger: "debt",
    response: "Managing debt is crucial for financial health:\n• Pay off high-interest debt first\n• Consider debt consolidation\n• Set up automatic payments\n• Create an emergency fund\n• Avoid taking on new debt while paying off existing"
  },
  {
    trigger: "invest",
    response: "Smart investing starts with a solid foundation:\n• Build an emergency fund first (3-6 months expenses)\n• Start with low-cost index funds\n• Consider your risk tolerance and timeline\n• Diversify your investments\n• Start early to benefit from compound interest"
  },
  {
    trigger: "goal",
    response: "Setting financial goals is key! Here's how:\n• Make goals specific and measurable\n• Set short-term (1 year) and long-term (5+ years) goals\n• Break big goals into smaller milestones\n• Track your progress regularly\n• Celebrate small wins along the way"
  }
];

const quickQuestions = [
  "How can I save more money?",
  "What's the best way to budget?",
  "How do I manage debt?",
  "Should I start investing?",
  "Help me set financial goals"
];

export default function BudgetAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI Budget Assistant. I can help you with saving money, creating budgets, managing debt, and setting financial goals. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const getAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const reply of aiReplies) {
      if (lowerMessage.includes(reply.trigger)) {
        return reply.response;
      }
    }
    
    return "I'm here to help with your budgeting and financial goals! Try asking me about:\n• Saving money\n• Creating budgets\n• Managing debt\n• Investing\n• Setting financial goals";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(question),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Floating AI Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 w-12 h-12 bg-[#A7C638] hover:bg-[#96B032] text-white rounded-full shadow-lg z-40"
      >
        <Bot className="w-5 h-5" />
      </Button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4">
          <Card className="w-full max-w-sm h-96 bg-white rounded-t-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-[#A7C638]" />
                <span className="font-semibold text-sm">Budget Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-xs ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-[#A7C638] text-white'
                    }`}
                  >
                    <div className="whitespace-pre-line">{message.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-3 border-t">
                <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs px-2 py-1 h-6"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me about budgeting..."
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#A7C638]"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-[#A7C638] hover:bg-[#96B032] text-white px-3"
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
} 