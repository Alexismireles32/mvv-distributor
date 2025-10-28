"use client";

import React from "react";

export function Gallery11_1() {
  return (
    <section id="relume" className="px-[5%] py-8 md:py-12 lg:py-14">
      <div className="container">
        <div className="grid grid-cols-1 gap-4 items-start justify-center md:grid-cols-2 md:gap-6">
          <div className="overflow-hidden rounded-lg bg-white/10">
            <img
              src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579693/HOLA_MI_TESTIMONIO_ES_ASOMBROSO._BAJE_MAS_DE_25_KILOS_CON_DUO_FUSION_XTREME._kjocjy.png"
              alt="Testimonio - Bajé más de 25 kilos"
              className="size-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-white/10">
            <img
              src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579693/test1_zy1npa.jpg"
              alt="Testimonio MVV Natural"
              className="size-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
