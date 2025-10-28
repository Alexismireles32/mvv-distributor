"use client";

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronRight } from "react-icons/rx";

const useRelume = ({ defaultValue, selects }) => {
  const [activeSelect, setActiveSelect] = useState(defaultValue);
  const currentSelect = selects.find(function (select) {
    return select.value === activeSelect;
  });
  return { activeSelect, setActiveSelect, currentSelect };
};

export function Blog32() {
  const useActive = useRelume({
    defaultValue: "all-posts",
    selects: [
      {
        value: "all-posts",
        trigger: "All Posts",
        content: [
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
        ],
      },
      {
        value: "category-one",
        trigger: "Category one",
        content: [
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
        ],
      },
      {
        value: "category-two",
        trigger: "Category two",
        content: [
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
        ],
      },
      {
        value: "category-three",
        trigger: "Category three",
        content: [
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
        ],
      },
      {
        value: "category-four",
        trigger: "Category four",
        content: [
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
          {
            url: "#",
            image: {
              src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
              alt: "Relume placeholder image",
            },
            category: "Category",
            readTime: "5 min read",
            title: "Blog title heading will go here",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim...",
            button: {
              title: "Read more",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          },
        ],
      },
    ],
  });
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container flex max-w-lg flex-col">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">Blog</p>
            <h1 className="mb-5 text-4xl font-bold leading-tight md:mb-6 md:text-7xl md:leading-tight lg:text-10xl lg:leading-none">
              Descubre salud natural
            </h1>
            <p className="md:text-md">
              Información científica y consejos para tu bienestar integral
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <div className="mb-10">
            <Select
              value={useActive.activeSelect}
              onValueChange={useActive.setActiveSelect}
            >
              <SelectTrigger className="min-w-[12.5rem] px-4 py-2 md:w-auto">
                Todos los posts
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-posts">Todos los posts</SelectItem>
                <SelectItem value="category-one">Salud natural</SelectItem>
                <SelectItem value="category-two">Detox y bienestar</SelectItem>
                <SelectItem value="category-three">Nutrición</SelectItem>
                <SelectItem value="category-four">Estilo de vida</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:gap-y-16">
                <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.5fr_1fr] md:gap-x-10 md:gap-y-4">
                  <a href="/blog/funcionan-pastillas-para-bajar-de-peso" className="w-full">
                    <img
                      src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=800&fit=crop"
                      alt="Frutas y verduras frescas para desintoxicación natural"
                      className="aspect-square w-full object-cover"
                    />
                  </a>
                  <div className="flex h-full flex-col items-start justify-center">
                    <div className="rb-4 mb-4 flex w-full items-center justify-start">
                      <p className="mr-4 bg-gum-leaf px-2 py-1 text-sm font-semibold text-como">
                        Salud
                      </p>
                      <p className="inline text-sm font-semibold">
                        5 min de lectura
                      </p>
                    </div>
                    <a className="mb-2" href="/blog/funcionan-pastillas-para-bajar-de-peso">
                      <h3 className="text-xl font-bold md:text-2xl">
                        Cómo eliminar toxinas de tu cuerpo naturalmente
                      </h3>
                    </a>
                    <p>
                      Descubre los métodos más efectivos para desintoxicar tu
                      organismo sin químicos agresivos
                    </p>
                    <a href="/blog/funcionan-pastillas-para-bajar-de-peso" className="mt-6 flex items-center gap-x-2 text-como font-semibold hover:underline">
                      Leer más
                      <RxChevronRight />
                    </a>
                  </div>
                </div>
                <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.5fr_1fr] md:gap-x-10 md:gap-y-4">
                  <a href="/blog/como-acelerar-metabolismo-naturalmente" className="w-full">
                    <img
                      src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=800&fit=crop"
                      alt="Suplementos naturales y hierbas medicinales"
                      className="aspect-square w-full object-cover"
                    />
                  </a>
                  <div className="flex h-full flex-col items-start justify-center">
                    <div className="rb-4 mb-4 flex w-full items-center justify-start">
                      <p className="mr-4 bg-gum-leaf px-2 py-1 text-sm font-semibold text-como">
                        Detox
                      </p>
                      <p className="inline text-sm font-semibold">
                        7 min de lectura
                      </p>
                    </div>
                    <a className="mb-2" href="/blog/como-acelerar-metabolismo-naturalmente">
                      <h3 className="text-xl font-bold md:text-2xl">
                        Beneficios de los suplementos naturales para tu sistema
                        inmunológico
                      </h3>
                    </a>
                    <p>
                      Estrategias científicas para fortalecer tus defensas con
                      ingredientes 100% naturales
                    </p>
                    <a href="/blog/como-acelerar-metabolismo-naturalmente" className="mt-6 flex items-center gap-x-2 text-como font-semibold hover:underline">
                      Leer más
                      <RxChevronRight />
                    </a>
                  </div>
                </div>
                <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.5fr_1fr] md:gap-x-10 md:gap-y-4">
                  <a href="/blog/mejores-suplementos-naturales-bajar-peso-mexico" className="w-full">
                    <img
                      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=800&fit=crop"
                      alt="Alimentación saludable y consciente con vegetales frescos"
                      className="aspect-square w-full object-cover"
                    />
                  </a>
                  <div className="flex h-full flex-col items-start justify-center">
                    <div className="rb-4 mb-4 flex w-full items-center justify-start">
                      <p className="mr-4 bg-gum-leaf px-2 py-1 text-sm font-semibold text-como">
                        Inmunidad
                      </p>
                      <p className="inline text-sm font-semibold">
                        6 min de lectura
                      </p>
                    </div>
                    <a className="mb-2" href="/blog/mejores-suplementos-naturales-bajar-peso-mexico">
                      <h3 className="text-xl font-bold md:text-2xl">
                        Alimentación consciente para un cuerpo saludable
                      </h3>
                    </a>
                    <p>
                      Guía completa para transformar tu dieta y mejorar tu
                      calidad de vida
                    </p>
                    <a href="/blog/mejores-suplementos-naturales-bajar-peso-mexico" className="mt-6 flex items-center gap-x-2 text-como font-semibold hover:underline">
                      Leer más
                      <RxChevronRight />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
