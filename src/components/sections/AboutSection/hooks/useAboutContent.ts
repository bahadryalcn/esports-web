export const useAboutContent = (customContent?: string) => {
  const defaultContent = {
    main: 'AIM Agency olarak, e-spor dünyasında profesyonel hizmetler sunan bir ajansız. Oyuncularımızın ve takımlarımızın başarısı için sürekli çalışıyor, onların kariyerlerinde fark yaratacak çözümler sunuyoruz.',
    secondary: '2020 yılında kurulan ajansımız, kısa sürede e-spor dünyasında saygın bir konum elde etti. Şampiyonluk seviyesindeki performansımız ve müşteri memnuniyetine odaklı yaklaşımımızla sektörde öncü olmaya devam ediyoruz.',
    vision: 'Vizyonumuz, Türkiye\'nin en büyük gaming ajansı olmak ve uluslararası arenada ülkemizi başarıyla temsil etmektir.'
  };

  return {
    main: customContent || defaultContent.main,
    secondary: defaultContent.secondary,
    vision: defaultContent.vision
  };
};
