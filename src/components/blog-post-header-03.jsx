"use client";

/**
 * REGLA PARA TODOS LOS BLOGS FUTUROS:
 * - Usar imágenes de salud genéricas de alta calidad (Unsplash)
 * - La imagen principal debe ser relevante al tema del artículo
 * - Tamaño recomendado: 1200x800px
 * - Alt text descriptivo para SEO
 */

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@relume_io/relume-ui";
import React from "react";
import {
  BiLinkAlt,
  BiLogoFacebookCircle,
  BiLogoLinkedinSquare,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

export function BlogPostHeader3() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid gap-x-20 gap-y-12 md:grid-cols-[.75fr_1fr]">
          <div className="mx-auto flex size-full max-w-lg flex-col items-start justify-start">
            <Breadcrumb className="mb-6 flex w-full items-center md:mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/articulo-de-blog">Salud natural</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="mb-8 text-3xl font-bold leading-tight md:mb-10 md:text-5xl md:leading-tight lg:mb-12 lg:text-8xl lg:leading-none">
              Cómo acelerar tu metabolismo de forma natural
            </h1>
            <div className="flex size-full flex-col items-start justify-start">
              <div className="rb-4 mb-6 flex items-center md:mb-8">
                <div>
                  <h6 className="font-semibold">
                    <span className="font-normal">Por</span> Equipo MVV
                  </h6>
                  <div className="mt-1 flex">
                    <p className="text-sm">15 ene 2024</p>
                    <span className="mx-2">•</span>
                    <p className="text-sm">5 min de lectura</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-base font-semibold">Compartir artículo</p>
                <div className="rt-4 mt-3 grid grid-flow-col grid-cols-[max-content] items-start gap-2 md:mt-4">
                  <a
                    href="#"
                    className="rounded-[1.25rem] bg-background-secondary p-1"
                  >
                    <BiLinkAlt className="size-6" />
                  </a>
                  <a
                    href="#"
                    className="rounded-[1.25rem] bg-background-secondary p-1"
                  >
                    <BiLogoLinkedinSquare className="size-6" />
                  </a>
                  <a
                    href="#"
                    className="rounded-[1.25rem] bg-background-secondary p-1"
                  >
                    <FaXTwitter className="size-6 p-0.5" />
                  </a>
                  <a
                    href="#"
                    className="rounded-[1.25rem] bg-background-secondary p-1"
                  >
                    <BiLogoFacebookCircle className="size-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=800&fit=crop"
              className="aspect-[3/2] size-full object-cover"
              alt="Alimentos saludables para acelerar el metabolismo naturalmente"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
