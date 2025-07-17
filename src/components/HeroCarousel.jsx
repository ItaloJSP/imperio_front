import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

// Substitua pelas URLs reais do seu Cloudinary
const images = [
  'https://res.cloudinary.com/dptiv0mc4/image/upload/v1752704482/SLIDE1_ikeoep.jpg',
  'https://res.cloudinary.com/dptiv0mc4/image/upload/v1752704483/slide3_gxuawv.png',
  'https://res.cloudinary.com/dptiv0mc4/image/upload/v1752704482/slide2_zvpipg.png',
  'https://res.cloudinary.com/dptiv0mc4/image/upload/v1752704482/slide4_rr5fhv.png',
];

export default function HeroCarousel() {
  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden">

      {/* Swiper com imagens */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay escuro (opcional) */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />

      {/* Logo sobreposta (sempre no topo) */}
      <div className="absolute top-[85%] left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2">
        <img
          src="/src/assets/Império.png"
          alt="Logo"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl object-cover"
        />
      </div>
    </div>
  );
}
