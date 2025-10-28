"use client";

import React from "react";

const testimonies = [
  { src: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579690/testimonio_dih0u8.png", alt: "Testimonio MVV Natural 1" },
  { src: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579691/testimonio_szvhma.jpg", alt: "Testimonio MVV Natural 2" },
  { src: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579693/HOLA_MI_TESTIMONIO_ES_ASOMBROSO._BAJE_MAS_DE_25_KILOS_CON_DUO_FUSION_XTREME._kjocjy.png", alt: "Testimonio - Bajé más de 25 kilos" },
  { src: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579693/test1_zy1npa.jpg", alt: "Testimonio MVV Natural 3" },
  { src: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579693/test3_cjq8wv.jpg", alt: "Testimonio MVV Natural 4" },
  { src: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579694/test2_ndab4x.jpg", alt: "Testimonio MVV Natural 5" },
  { src: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579695/testimonio2_luzqbe.webp", alt: "Testimonio MVV Natural 6" },
  { src: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579695/WhatsApp_Image_2025-10-27_at_6.37.17_AM_hjl01y.jpg", alt: "Testimonio MVV Natural 7" },
  { src: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579696/WhatsApp_Image_2025-10-27_at_6.37.50_AM_ya6lni.jpg", alt: "Testimonio MVV Natural 8" },
  { src: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579697/WhatsApp_Image_2025-10-27_at_6.42.33_AM_ew3mfb.jpg", alt: "Testimonio MVV Natural 9" },
  { src: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579698/WhatsApp_Image_2025-10-27_at_6.44.06_AM_dkuaua.jpg", alt: "Testimonio MVV Natural 10" },
  { src: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579700/WhatsApp_Image_2025-10-27_at_6.44.30_AM_wvy6as.jpg", alt: "Testimonio MVV Natural 11" },
  { src: "https://res.cloudinary.com/dsulhqvza/image/upload/ar_1:1,c_crop/WhatsApp_Image_2025-10-27_at_6.44.20_AM_yu68zh.jpg", alt: "Testimonio MVV Natural 12" },
];

export function TestimonialsVerticalGallery() {
  return (
    <section className="bg-black py-12 md:py-16">
      <div className="container">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold leading-tight text-white md:mb-4 md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
            Historias de éxito
          </h2>
          <p className="text-base text-white/90 md:text-lg max-w-3xl mx-auto px-[5%]">
            Resultados reales de clientes que han confiado en nuestros productos. Transformaciones documentadas con seguimiento profesional.
          </p>
        </div>

        {/* Vertical Stack of Images */}
        <div className="space-y-0">
          {testimonies.map((testimony, index) => (
            <div 
              key={index} 
              className="w-full h-[90vh] flex items-center justify-center bg-black"
            >
              <img
                src={testimony.src}
                alt={testimony.alt}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Footer text */}
        <div className="mt-8 text-center md:mt-12">
          <p className="text-base font-semibold text-white/90 md:text-lg">
            ✨ Y muchos testimonios más en nuestros <span className="text-white">15 años de experiencia</span> transformando vidas ✨
          </p>
        </div>
      </div>
    </section>
  );
}

