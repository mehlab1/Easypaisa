import { 
  User, 
  Shield, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Eye,
  EyeOff,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Wallet,
  Activity,
  FileText,
  Star,
  Gift
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Mock user data
const userProfile = {
  name: "Ahmad Khan",
  phone: "+92 300 1234567",
  email: "ahmad.khan@email.com",
  address: "Gulberg III, Lahore, Pakistan",
  memberSince: "March 2023",
  accountType: "Premium",
  balance: "₨ 12,450.00",
  accountNumber: "EP-1234567890",
  kycStatus: "Verified",
  lastLogin: "Today, 2:30 PM"
};

// Mock transaction history
const recentTransactions = [
  {
    id: 1,
    type: "sent",
    amount: 5000,
    recipient: "Sara Ahmed",
    date: "Today, 3:45 PM",
    status: "completed"
  },
  {
    id: 2,
    type: "received",
    amount: 2500,
    sender: "Ali Hassan",
    date: "Yesterday, 1:20 PM",
    status: "completed"
  },
  {
    id: 3,
    type: "bill_payment",
    amount: 1500,
    service: "Electricity Bill",
    date: "Dec 15, 2024",
    status: "completed"
  },
  {
    id: 4,
    type: "mobile_load",
    amount: 100,
    service: "Mobile Load",
    date: "Dec 14, 2024",
    status: "completed"
  }
];

// Account menu items
const accountMenuItems = [
  {
    id: "profile",
    title: "Profile Settings",
    subtitle: "Update personal information",
    icon: User,
    color: "text-blue-500"
  },
  {
    id: "security",
    title: "Security & Privacy",
    subtitle: "Password, PIN, and security settings",
    icon: Shield,
    color: "text-green-500"
  },
  {
    id: "cards",
    title: "Cards & Accounts",
    subtitle: "Manage linked cards and accounts",
    icon: CreditCard,
    color: "text-purple-500"
  },
  {
    id: "preferences",
    title: "Preferences",
    subtitle: "Notifications and app settings",
    icon: Settings,
    color: "text-orange-500"
  },
  {
    id: "help",
    title: "Help & Support",
    subtitle: "Contact customer service",
    icon: HelpCircle,
    color: "text-gray-500"
  }
];

export default function Account() {
  const [showBalance, setShowBalance] = useState(true);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "sent":
        return <Activity className="w-4 h-4 text-red-500" />;
      case "received":
        return <Activity className="w-4 h-4 text-green-500" />;
      case "bill_payment":
        return <FileText className="w-4 h-4 text-blue-500" />;
      case "mobile_load":
        return <Phone className="w-4 h-4 text-purple-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTransactionText = (transaction: any) => {
    switch (transaction.type) {
      case "sent":
        return `Sent to ${transaction.recipient}`;
      case "received":
        return `Received from ${transaction.sender}`;
      case "bill_payment":
        return transaction.service;
      case "mobile_load":
        return transaction.service;
      default:
        return "Transaction";
    }
  };

  return (
    <div className="px-3 py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-[#333333]">My Account</h1>
        <p className="text-gray-600 text-xs">Manage your Easypaisa account</p>
      </div>

      {/* Profile Card */}
      <Card className="p-4 mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-[#A7C638] rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[#333333]">{userProfile.name}</h2>
            <p className="text-gray-600 text-xs">{userProfile.accountType} Account</p>
            <div className="flex items-center mt-1">
              <Shield className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">{userProfile.kycStatus}</span>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wallet className="w-3 h-3 text-gray-400 mr-2" />
              <span className="text-xs text-gray-600">Account Balance</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-[#333333] text-sm">
                {showBalance ? userProfile.balance : "₨ ••••••"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="h-6 w-6 p-0"
              >
                {showBalance ? (
                  <EyeOff className="w-3 h-3 text-gray-400" />
                ) : (
                  <Eye className="w-3 h-3 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="w-3 h-3 text-gray-400 mr-2" />
              <span className="text-xs text-gray-600">Account Number</span>
            </div>
            <span className="text-xs font-medium text-[#333333]">{userProfile.accountNumber}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 text-gray-400 mr-2" />
              <span className="text-xs text-gray-600">Member Since</span>
            </div>
            <span className="text-xs text-[#333333]">{userProfile.memberSince}</span>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-4 mb-4">
        <h3 className="font-semibold text-[#333333] mb-3 text-sm">Contact Information</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Phone className="w-3 h-3 text-gray-400 mr-2" />
            <span className="text-xs text-[#333333]">{userProfile.phone}</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-3 h-3 text-gray-400 mr-2" />
            <span className="text-xs text-[#333333]">{userProfile.email}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-3 h-3 text-gray-400 mr-2" />
            <span className="text-xs text-[#333333]">{userProfile.address}</span>
          </div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-[#333333] text-sm">Recent Transactions</h3>
          <Button variant="outline" size="sm" className="text-[#A7C638] border-[#A7C638] text-xs px-2 py-1">
            View All
          </Button>
        </div>
        <div className="space-y-2">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                {getTransactionIcon(transaction.type)}
                <div>
                  <p className="text-xs font-medium text-[#333333]">
                    {getTransactionText(transaction)}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xs font-semibold ${
                  transaction.type === 'sent' ? 'text-red-500' : 'text-green-500'
                }`}>
                  {transaction.type === 'sent' ? '-' : '+'}₨ {transaction.amount.toLocaleString()}
                </p>
                <p className="text-xs text-green-600">{transaction.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Account Menu */}
      <Card className="p-4 mb-4">
        <h3 className="font-semibold text-[#333333] mb-3 text-sm">Account Settings</h3>
        <div className="space-y-1">
          {accountMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <div className="text-left">
                    <p className="text-xs font-medium text-[#333333]">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="w-3 h-3 text-gray-400" />
              </button>
            );
          })}
        </div>
      </Card>

      {/* Rewards & Offers */}
      <Card className="p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[#333333] text-sm">Rewards & Offers</h3>
          <Star className="w-4 h-4 text-yellow-400" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-[#FFF9E6] rounded-lg">
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4 text-yellow-500" />
              <div>
                <p className="text-xs font-medium text-[#333333]">Cashback Points</p>
                <p className="text-xs text-gray-600">Earn points on every transaction</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#A7C638]">1,250 pts</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-[#E6F4EA] rounded-lg">
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4 text-[#A7C638]" />
              <div>
                <p className="text-xs font-medium text-[#333333]">Active Offers</p>
                <p className="text-xs text-gray-600">5% cashback on groceries</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#A7C638]">2 offers</span>
          </div>
        </div>
      </Card>

      {/* Logout Button */}
      <Button 
        variant="outline" 
        className="w-full border-red-200 text-red-600 hover:bg-red-50 text-xs py-2"
      >
        <LogOut className="w-3 h-3 mr-1" />
        Logout
      </Button>
    </div>
  );
} 