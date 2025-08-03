import { useProvince } from "@/contexts/ProvinceContext";

export default function CulturalTheme() {
  const { selectedProvince } = useProvince();

  // Don't show cultural elements for "none" (base Pakistan theme)
  if (selectedProvince.id === "none") {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
      {/* Cultural Icons Overlay */}
      <div className="absolute top-20 right-4 opacity-20">
        <div className="text-6xl">{selectedProvince.cultural.icons[0]}</div>
      </div>
      
      <div className="absolute top-32 left-4 opacity-15">
        <div className="text-4xl">{selectedProvince.cultural.icons[1]}</div>
      </div>
      
      <div className="absolute bottom-40 right-8 opacity-20">
        <div className="text-5xl">{selectedProvince.cultural.icons[2]}</div>
      </div>

      {/* Cultural Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, ${selectedProvince.colors.primary} 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, ${selectedProvince.colors.secondary} 0%, transparent 50%)`,
          backgroundSize: '200px 200px, 150px 150px'
        }}></div>
      </div>

      {/* Province Name Watermark */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 opacity-10">
        <div className="text-2xl font-bold text-center" style={{ color: selectedProvince.colors.primary }}>
          {selectedProvince.name}
        </div>
      </div>
    </div>
  );
} 