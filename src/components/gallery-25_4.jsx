"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@relume_io/relume-ui";
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
    return `mx-[3px] inline-block size-2 rounded-full ${
      current === index + 1 ? "bg-como" : "bg-neutral-light"
    }`;
  };

  return { api, setApi, current, handleDotClick, dotClassName };
};

export function Gallery25_4() {
  const carouselState = useCarousel();
  return (
    <section id="relume" className="overflow-hidden py-16 md:py-24 lg:py-28">
      <div className="grid auto-cols-fr grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-0">
        <div className="flex lg:justify-self-end">
          <div className="mx-[5%] w-full max-w-md lg:mb-24 lg:ml-[5vw] lg:mr-20">
            <h2 className="mb-5 text-3xl font-bold leading-tight md:mb-6 md:text-5xl md:leading-tight lg:text-8xl lg:leading-none">
              Catálogo de suplementos
            </h2>
            <p className="md:text-md">
              Descubre nuestra línea completa de suplementos naturales para tu
              bienestar
            </p>
          </div>
        </div>
        <Carousel
          setApi={carouselState.setApi}
          opts={{ loop: true, align: "start" }}
          className="overflow-hidden px-[5%] lg:px-0"
        >
          <CarouselContent className="ml-0">
            <CarouselItem className="basis-[95%] pl-0 pr-6 sm:basis-4/5 md:basis-1/2 md:pr-8 lg:basis-4/5">
              <div>
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 1"
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[95%] pl-0 pr-6 sm:basis-4/5 md:basis-1/2 md:pr-8 lg:basis-4/5">
              <div>
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 2"
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[95%] pl-0 pr-6 sm:basis-4/5 md:basis-1/2 md:pr-8 lg:basis-4/5">
              <div>
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 3"
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[95%] pl-0 pr-6 sm:basis-4/5 md:basis-1/2 md:pr-8 lg:basis-4/5">
              <div>
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 4"
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[95%] pl-0 pr-6 sm:basis-4/5 md:basis-1/2 md:pr-8 lg:basis-4/5">
              <div>
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 5"
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[95%] pl-0 pr-6 sm:basis-4/5 md:basis-1/2 md:pr-8 lg:basis-4/5">
              <div>
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 6"
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-[95%] pl-0 pr-6 sm:basis-4/5 md:basis-1/2 md:pr-8 lg:basis-4/5">
              <div>
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 7"
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="mt-12 flex items-center justify-between">
            <div className="flex gap-2 md:gap-4">
              <CarouselPrevious className="static left-0 top-0 size-12 -translate-y-0" />
              <CarouselNext className="static left-0 top-0 size-12 -translate-y-0" />
            </div>
            <div className="absolute right-[5%] mt-5 flex items-center justify-end md:right-8 lg:right-16">
              <button
                onClick={carouselState.handleDotClick(0)}
                className={carouselState.dotClassName(0)}
              />
              <button
                onClick={carouselState.handleDotClick(1)}
                className={carouselState.dotClassName(1)}
              />
              <button
                onClick={carouselState.handleDotClick(2)}
                className={carouselState.dotClassName(2)}
              />
              <button
                onClick={carouselState.handleDotClick(3)}
                className={carouselState.dotClassName(3)}
              />
              <button
                onClick={carouselState.handleDotClick(4)}
                className={carouselState.dotClassName(4)}
              />
              <button
                onClick={carouselState.handleDotClick(5)}
                className={carouselState.dotClassName(5)}
              />
              <button
                onClick={carouselState.handleDotClick(6)}
                className={carouselState.dotClassName(6)}
              />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
