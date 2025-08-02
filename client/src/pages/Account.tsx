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
        return <Activity className="w-5 h-5 text-red-500" />;
      case "received":
        return <Activity className="w-5 h-5 text-green-500" />;
      case "bill_payment":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "mobile_load":
        return <Phone className="w-5 h-5 text-purple-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
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
    <div className="px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#333333]">My Account</h1>
        <p className="text-gray-600 text-sm">Manage your Easypaisa account</p>
      </div>

      {/* Profile Card */}
      <Card className="p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-[#A7C638] rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#333333]">{userProfile.name}</h2>
            <p className="text-gray-600 text-sm">{userProfile.accountType} Account</p>
            <div className="flex items-center mt-1">
              <Shield className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-green-600">{userProfile.kycStatus}</span>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wallet className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Account Balance</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-[#333333]">
                {showBalance ? userProfile.balance : "₨ ••••••"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Account Number</span>
            </div>
            <span className="text-sm font-medium text-[#333333]">{userProfile.accountNumber}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Member Since</span>
            </div>
            <span className="text-sm text-[#333333]">{userProfile.memberSince}</span>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-6 mb-6">
        <h3 className="font-semibold text-[#333333] mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <Phone className="w-4 h-4 text-gray-400 mr-3" />
            <span className="text-sm text-[#333333]">{userProfile.phone}</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-4 h-4 text-gray-400 mr-3" />
            <span className="text-sm text-[#333333]">{userProfile.email}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-gray-400 mr-3" />
            <span className="text-sm text-[#333333]">{userProfile.address}</span>
          </div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-[#333333]">Recent Transactions</h3>
          <Button variant="outline" size="sm" className="text-[#A7C638] border-[#A7C638]">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                {getTransactionIcon(transaction.type)}
                <div>
                  <p className="text-sm font-medium text-[#333333]">
                    {getTransactionText(transaction)}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${
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
      <Card className="p-6 mb-6">
        <h3 className="font-semibold text-[#333333] mb-4">Account Settings</h3>
        <div className="space-y-2">
          {accountMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <div className="text-left">
                    <p className="text-sm font-medium text-[#333333]">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            );
          })}
        </div>
      </Card>

      {/* Rewards & Offers */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#333333]">Rewards & Offers</h3>
          <Star className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#FFF9E6] rounded-lg">
            <div className="flex items-center space-x-3">
              <Gift className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-[#333333]">Cashback Points</p>
                <p className="text-xs text-gray-600">Earn points on every transaction</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-[#A7C638]">1,250 pts</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#E6F4EA] rounded-lg">
            <div className="flex items-center space-x-3">
              <Gift className="w-5 h-5 text-[#A7C638]" />
              <div>
                <p className="text-sm font-medium text-[#333333]">Active Offers</p>
                <p className="text-xs text-gray-600">5% cashback on groceries</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-[#A7C638]">2 offers</span>
          </div>
        </div>
      </Card>

      {/* Logout Button */}
      <Button 
        variant="outline" 
        className="w-full border-red-200 text-red-600 hover:bg-red-50"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </div>
  );
} 