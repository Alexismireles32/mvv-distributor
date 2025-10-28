"use client";

import React from "react";

export function Gallery11() {
  return (
    <section id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mb-8 text-center md:mb-12 lg:mb-16">
          <h2 className="mb-3 text-3xl font-bold leading-tight md:mb-4 md:text-5xl md:leading-tight lg:text-7xl lg:leading-tight">
            Historias reales
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 items-start justify-center md:grid-cols-2 md:gap-6">
          <div className="overflow-hidden rounded-lg bg-white/10">
            <img
              src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579690/testimonio_dih0u8.png"
              alt="Testimonio MVV Natural 1"
              className="size-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-white/10">
            <img
              src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761579691/testimonio_szvhma.jpg"
              alt="Testimonio MVV Natural 2"
              className="size-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
