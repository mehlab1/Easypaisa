import { MapPin, Phone, Clock, Star, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for cash points
const cashPoints = [
  {
    id: 1,
    name: "Easypaisa Shop - Gulberg",
    address: "Shop #15, Block 3, Gulberg III, Lahore",
    distance: "0.8 km",
    rating: 4.5,
    phone: "0300-1234567",
    hours: "9:00 AM - 8:00 PM",
    services: ["Cash Withdrawal", "Money Transfer", "Bill Payment", "Mobile Load"],
    isOpen: true
  },
  {
    id: 2,
    name: "Easypaisa Kiosk - Liberty Market",
    address: "Liberty Market, Main Boulevard, Lahore",
    distance: "1.2 km",
    rating: 4.2,
    phone: "0300-1234568",
    hours: "10:00 AM - 9:00 PM",
    services: ["Cash Withdrawal", "Money Transfer", "Bill Payment"],
    isOpen: true
  },
  {
    id: 3,
    name: "Easypaisa Center - DHA",
    address: "Phase 6, DHA, Lahore",
    distance: "2.1 km",
    rating: 4.7,
    phone: "0300-1234569",
    hours: "9:00 AM - 7:00 PM",
    services: ["Cash Withdrawal", "Money Transfer", "Bill Payment", "Mobile Load", "Insurance"],
    isOpen: false
  },
  {
    id: 4,
    name: "Easypaisa Shop - Model Town",
    address: "Model Town Link Road, Lahore",
    distance: "3.5 km",
    rating: 4.0,
    phone: "0300-1234570",
    hours: "8:00 AM - 8:00 PM",
    services: ["Cash Withdrawal", "Money Transfer"],
    isOpen: true
  }
];

export default function CashPoints() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0F7E0] via-[#C0EBC0] to-white px-3 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold text-[#333333]">Cash Points</h1>
          <p className="text-gray-600 text-xs">Find nearby Easypaisa locations</p>
        </div>
        <Button className="bg-[#00C853] hover:bg-[#00B548] text-white rounded-full text-xs font-medium px-3 py-1">
          <MapPin className="w-3 h-3 mr-1" />
          Use My Location
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by area, landmark, or address..."
            className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:border-[#A7C638] text-sm"
          />
          <MapPin className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" />
        </div>
      </div>

      {/* Cash Points List */}
      <div className="space-y-3">
        {cashPoints.map((point) => (
          <Card key={point.id} className="p-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-[#333333] text-sm mb-1">{point.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{point.address}</p>
                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-[#A7C638] font-medium">{point.distance}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    <span className="text-gray-600">{point.rating}</span>
                  </div>
                  <div className={`flex items-center ${point.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-1 ${point.isOpen ? 'bg-green-600' : 'bg-red-600'}`}></div>
                    <span className="text-xs">{point.isOpen ? 'Open' : 'Closed'}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-white h-8 w-8 p-0">
                <Navigation className="w-3 h-3" />
              </Button>
            </div>

            {/* Services */}
            <div className="mb-2">
              <p className="text-xs text-gray-500 mb-1">Available Services:</p>
              <div className="flex flex-wrap gap-1">
                {point.services.map((service, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-[#E0F7E0] text-[#00C853] text-xs rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact & Hours */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-3 text-xs text-gray-600">
                <div className="flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  <span>{point.phone}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{point.hours}</span>
                </div>
              </div>
              <Button size="sm" className="bg-[#00C853] hover:bg-[#00B548] text-white text-xs px-2 py-1">
                Call Now
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Map Placeholder */}
      <div className="mt-4">
        <Card className="p-3">
          <h3 className="font-semibold text-[#333333] mb-3 text-sm">Map View</h3>
          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-1" />
              <p className="text-gray-500 text-xs">Interactive map will be implemented here</p>
              <p className="text-xs text-gray-400">Showing {cashPoints.length} nearby locations</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 