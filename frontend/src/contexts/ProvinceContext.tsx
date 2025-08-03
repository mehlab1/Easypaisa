import React, { createContext, useContext, useState, ReactNode } from "react";

interface Province {
  id: string;
  name: string;
  flag: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  theme: {
    gradient: string;
    buttonColor: string;
    buttonHover: string;
  };
  cultural: {
    icons: string[];
    patterns: string[];
    landmarks: string[];
    colors: string[];
  };
}

const defaultProvince: Province = {
  id: "none",
  name: "Pakistan",
  flag: "🇵🇰",
  colors: {
    primary: "#A7C638",
    secondary: "#96B032",
    accent: "#7A9A28"
  },
  theme: {
    gradient: "bg-gradient-to-br from-green-500 to-green-600",
    buttonColor: "bg-green-600",
    buttonHover: "hover:bg-green-700"
  },
  cultural: {
    icons: ["🏛️", "🌿", "💚"],
    patterns: ["geometric", "floral"],
    landmarks: ["Minar-e-Pakistan", "Faisal Mosque"],
    colors: ["#228B22", "#32CD32", "#006400"]
  }
};

interface ProvinceContextType {
  selectedProvince: Province;
  setSelectedProvince: (province: Province) => void;
}

const ProvinceContext = createContext<ProvinceContextType | undefined>(undefined);

export function ProvinceProvider({ children }: { children: ReactNode }) {
  const [selectedProvince, setSelectedProvince] = useState<Province>(defaultProvince);

  return (
    <ProvinceContext.Provider value={{ selectedProvince, setSelectedProvince }}>
      {children}
    </ProvinceContext.Provider>
  );
}

export function useProvince() {
  const context = useContext(ProvinceContext);
  if (context === undefined) {
    throw new Error("useProvince must be used within a ProvinceProvider");
  }
  return context;
} 