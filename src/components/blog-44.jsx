"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Blog44() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 grid grid-cols-1 items-start justify-start gap-y-8 md:mb-18 md:grid-cols-[1fr_max-content] md:items-end md:justify-between md:gap-x-12 md:gap-y-4 lg:mb-20 lg:gap-x-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">Blog</p>
            <h1 className="mb-3 text-3xl font-bold leading-tight md:mb-4 md:text-5xl md:leading-tight lg:text-8xl lg:leading-none">
              Explora tu camino hacia la salud
            </h1>
            <p className="md:text-md">
              Descubre artículos científicos sobre bienestar natural
            </p>
          </div>
          <div className="hidden flex-wrap items-center justify-end md:block">
            <Button title="Ver todos" variant="secondary" asChild>
              <a href="/blog">
                Ver todos
              </a>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          <div className="group flex size-full flex-col items-center justify-start border border-border-primary bg-white transition-all duration-300 hover:shadow-xl hover:border-como">
            <div className="relative w-full overflow-hidden pt-[66%]">
              <img
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop"
                alt="Alimentos frescos y nutritivos para metabolismo saludable"
                className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="px-5 py-6 md:p-6">
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <p className="mr-4 bg-gum-leaf px-2 py-1 text-sm font-semibold text-como">
                  Nutrición
                </p>
                <p className="inline text-sm font-semibold">8 min lectura</p>
              </div>
              <a className="mb-2" href="/blog/como-acelerar-metabolismo-naturalmente">
                <h2 className="mb-2 text-xl font-bold md:text-2xl">
                  Estrategias naturales para equilibrar tu metabolismo
                </h2>
              </a>
              <p>
                Técnicas comprobadas para optimizar tu digestión y energía
                corporal
              </p>
              <a href="/blog/como-acelerar-metabolismo-naturalmente" className="mt-6 flex items-center gap-x-1 text-como font-semibold hover:underline">
                Leer más
                <RxChevronRight />
              </a>
            </div>
          </div>
          <div className="group flex size-full flex-col items-center justify-start border border-border-primary bg-white transition-all duration-300 hover:shadow-xl hover:border-como">
            <div className="relative w-full overflow-hidden pt-[66%]">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop"
                alt="Meditación y bienestar natural para reducir estrés"
                className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="px-5 py-6 md:p-6">
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <p className="mr-4 bg-gum-leaf px-2 py-1 text-sm font-semibold text-como">
                  Bienestar
                </p>
                <p className="inline text-sm font-semibold">6 min lectura</p>
              </div>
              <a className="mb-2" href="/blog/funcionan-pastillas-para-bajar-de-peso">
                <h2 className="mb-2 text-xl font-bold md:text-2xl">
                  Mindfulness y suplementación para reducir el estrés
                </h2>
              </a>
              <p>
                Métodos holísticos para recuperar tu equilibrio emocional y
                físico
              </p>
              <a href="/blog/funcionan-pastillas-para-bajar-de-peso" className="mt-6 flex items-center gap-x-1 text-como font-semibold hover:underline">
                Leer más
                <RxChevronRight />
              </a>
            </div>
          </div>
          <div className="group flex size-full flex-col items-center justify-start border border-border-primary bg-white transition-all duration-300 hover:shadow-xl hover:border-como">
            <div className="relative w-full overflow-hidden pt-[66%]">
              <img
                src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&h=600&fit=crop"
                alt="Sistema inmunológico fuerte con remedios naturales"
                className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="px-5 py-6 md:p-6">
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <p className="mr-4 bg-gum-leaf px-2 py-1 text-sm font-semibold text-como">
                  Prevención
                </p>
                <p className="inline text-sm font-semibold">7 min lectura</p>
              </div>
              <a className="mb-2" href="/blog/mejores-suplementos-naturales-bajar-peso-mexico">
                <h2 className="mb-2 text-xl font-bold md:text-2xl">
                  Protege tu sistema inmunológico con remedios naturales
                </h2>
              </a>
              <p>
                Consejos prácticos para fortalecer tus defensas sin medicamentos
                sintéticos
              </p>
              <a href="/blog/mejores-suplementos-naturales-bajar-peso-mexico" className="mt-6 flex items-center gap-x-1 text-como font-semibold hover:underline">
                Leer más
                <RxChevronRight />
              </a>
            </div>
          </div>
        </div>
        <Button
          title="Ver todos"
          variant="secondary"
          className="mt-12 md:hidden"
          asChild
        >
          <a href="/blog">
            Ver todos
          </a>
        </Button>
      </div>
    </section>
  );
}
