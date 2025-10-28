"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@relume_io/relume-ui";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const useCarousel = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index) => () => {
    if (api) {
      api.scrollTo(index);
    }
  };

  const dotClassName = (index) => {
    return clsx("mx-[3px] inline-block size-2 rounded-full", {
      "bg-como": current === index + 1,
      "bg-neutral-light": current !== index + 1,
    });
  };

  return { api, setApi, handleDotClick, dotClassName };
};

export function Gallery21() {
  const carouselState = useCarousel();
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

  return (
    <section
      id="relume"
      className="bg-gradient-to-br from-como via-[#3d6849] to-como overflow-hidden px-[5%] py-10 md:py-16 lg:py-20"
    >
      <div className="container">
        <div className="mb-6 md:mb-10 lg:mb-14">
          <h2 className="mb-2 text-2xl font-bold leading-tight text-white xxs:text-3xl sm:mb-3 md:mb-4 md:text-4xl md:leading-tight lg:text-6xl lg:leading-tight xl:text-7xl xl:leading-tight">
            Historias de éxito
          </h2>
          <p className="text-sm text-white/90 md:text-base">
            Resultados reales de clientes que han confiado en nuestros
            productos. Transformaciones documentadas con seguimiento
            profesional.
          </p>
        </div>
        
        <Carousel
          setApi={carouselState.setApi}
          opts={{ 
            loop: true, 
            align: "start" 
          }}
          className="overflow-hidden px-[5%] lg:px-0"
        >
          <CarouselContent className="ml-0">
            {testimonies.map((testimony, index) => (
              <CarouselItem key={index} className="basis-[95%] pl-0 pr-6 sm:basis-4/5 md:basis-1/2 md:pr-8 lg:basis-1/3">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white/10 border border-white/20">
                  <img
                    src={testimony.src}
                    alt={testimony.alt}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="mt-12 flex items-center justify-between">
            <div className="flex gap-2 md:gap-4">
              <CarouselPrevious className="static left-0 top-0 size-12 -translate-y-0 border-2 border-white bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm" />
              <CarouselNext className="static left-0 top-0 size-12 -translate-y-0 border-2 border-white bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm" />
            </div>
          </div>
        </Carousel>
        
        <div className="mt-8 text-center md:mt-12">
          <p className="text-base font-semibold text-white/90 md:text-lg">
            ✨ Y muchos testimonios más en nuestros <span className="text-white">15 años de experiencia</span> transformando vidas ✨
          </p>
        </div>
      </div>
    </section>
  );
}
