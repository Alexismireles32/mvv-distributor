"use client";

import React from "react";

export function Gallery11_4() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-3xl font-bold leading-tight md:mb-6 md:text-5xl md:leading-tight lg:text-8xl lg:leading-none">
            ⏱️ Pérdida de peso efectiva
          </h2>
        </div>
        <div className="grid grid-cols-1 items-start justify-center md:grid-cols-2">
          <a href="#">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 1"
              className="size-full object-cover"
            />
          </a>
          <a href="#">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 2"
              className="size-full object-cover"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
