export const useAboutContent = (customContent?: string) => {
  const defaultContent = {
    main: 'AIM Agency olarak, e-spor dünyasında profesyonel hizmetler sunan bir ajansız. Oyuncularımızın ve takımlarımızın başarısı için sürekli çalışıyor, onların kariyerlerinde fark yaratacak çözümler sunuyoruz.',
    secondary: '2020 yılında kurulan ajansımız, kısa sürede e-spor dünyasında saygın bir konum elde etti. Şampiyonluk seviyesindeki performansımız ve müşteri memnuniyetine odaklı yaklaşımımızla sektörde öncü olmaya devam ediyoruz.',
    vision: 'Vizyonumuz, Türkiye\'nin en büyük gaming ajansı olmak ve uluslararası arenada ülkemizi başarıyla temsil etmektir.'
  };

  // If custom content is provided, try to parse it for different sections
  if (customContent) {
    // Check if content contains specific markers for different sections
    const hasMission = customContent.includes('Misyonumuz') || customContent.includes('Mission');
    const hasVision = customContent.includes('Vizyonumuz') || customContent.includes('Vision');
    
    if (hasMission && hasVision) {
      // Content has both mission and vision, extract them
      const missionMatch = customContent.match(/(?:Misyonumuz|Mission)[:\s]*([\s\S]*?)(?=\n|Vizyonumuz|Vision|$)/);
      const visionMatch = customContent.match(/(?:Vizyonumuz|Vision)[:\s]*([\s\S]*?)(?=\n|Misyonumuz|Mission|$)/);
      
      return {
        main: customContent,
        secondary: missionMatch ? missionMatch[1].trim() : defaultContent.secondary,
        vision: visionMatch ? visionMatch[1].trim() : defaultContent.vision
      };
    } else if (hasMission) {
      // Only mission found
      const missionMatch = customContent.match(/(?:Misyonumuz|Mission)[:\s]*([\s\S]*?)(?=\n|$)/);
      return {
        main: customContent,
        secondary: missionMatch ? missionMatch[1].trim() : defaultContent.secondary,
        vision: defaultContent.vision
      };
    } else if (hasVision) {
      // Only vision found
      const visionMatch = customContent.match(/(?:Vizyonumuz|Vision)[:\s]*([\s\S]*?)(?=\n|$)/);
      return {
        main: customContent,
        secondary: defaultContent.secondary,
        vision: visionMatch ? visionMatch[1].trim() : defaultContent.vision
      };
    }
    
    // No specific sections found, use as main content
    return {
      main: customContent,
      secondary: defaultContent.secondary,
      vision: defaultContent.vision
    };
  }

  return defaultContent;
};
