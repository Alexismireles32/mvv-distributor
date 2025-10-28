"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@relume_io/relume-ui";
import React, { Fragment } from "react";
import { BiStar, BiSolidStar, BiSolidStarHalf } from "react-icons/bi";

const Star = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-1 text-sandy-brown">
      {[...Array(5)].map((_, i) => {
        const isFullStar = i < fullStars;
        const isHalfStar = hasHalfStar && i === fullStars;

        return (
          <div key={i}>
            {isFullStar ? (
              <BiSolidStar />
            ) : isHalfStar ? (
              <BiSolidStarHalf />
            ) : (
              <BiStar />
            )}
          </div>
        );
      })}
    </div>
  );
};

export function ProductHeader6({ 
  productName = "Duo-60 Fusion",
  productUrl = "/duo-60-fusion" 
} = {}) {
  return (
    <header id="relume">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative block w-full pt-[120%] lg:hidden">
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
            alt="Relume placeholder image 1"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="hidden lg:flex lg:flex-col">
          <div className="relative lg:h-screen lg:max-h-[60rem]">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 1"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="relative lg:h-screen lg:max-h-[60rem]">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 1"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="relative lg:h-screen lg:max-h-[60rem]">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 1"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="relative lg:h-screen lg:max-h-[60rem]">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              alt="Relume placeholder image 1"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>
        <div>
          <div className="px-[5%] pb-20 pt-8 md:pt-12 lg:sticky lg:top-0 lg:py-20 lg:pl-20 lg:pr-[5vw]">
            <div className="lg:max-w-md">
              <Breadcrumb className="mb-6 flex flex-wrap items-center text-sm">
                <BreadcrumbList>
                  <Fragment>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </Fragment>
                  <Fragment>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/productos">Productos</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </Fragment>
                  <Fragment>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={productUrl}>{productName}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </Fragment>
                </BreadcrumbList>
              </Breadcrumb>
              <div>
                <h1 className="mb-5 text-3xl font-bold leading-tight md:mb-6 md:text-4xl md:leading-tight lg:text-6xl lg:leading-none">
                  Duo-60 Fusion
                </h1>
                <div className="mb-5 flex flex-col flex-wrap sm:flex-row sm:items-center md:mb-6">
                  <p className="text-xl font-bold md:text-2xl">Xtreme</p>
                  <div className="mx-4 hidden w-px self-stretch bg-background-alternative sm:block" />
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-semibold text-como">15 años de experiencia</p>
                  </div>
                </div>
                <p className="mb-5 md:mb-6">
                  🔥 El quemador de grasa más potente de nuestra línea. Fórmula
                  dual avanzada que combina aceleración extrema del metabolismo
                  con control total del apetito. 60 días de transformación real.
                  💪 Doble acción poderosa: Quema grasa acumulada mientras
                  bloquea nueva absorción. Convierte tu cuerpo en una máquina
                  quemadora de calorías 24/7, incluso en reposo. ⚡ Acelera tu
                  metabolismo hasta 3 veces más rápido. Ingredientes naturales
                  termogénicos que elevan tu temperatura corporal y disparan la
                  quema de grasa desde la primera toma. 🍽️ Controla ansiedad y
                  antojos intensos. Reduce el hambre emocional y los atracones
                  nocturnos. Come menos sin sentir que te estás sacrificando. ✨
                  Resultados comprobados: Clientes han perdido entre 15-25 kilos
                  en 2-3 meses siguiendo el tratamiento completo con
                  alimentación balanceada. 🌿 100% ingredientes naturales. Sin
                  químicos agresivos. Fórmula herbal de alta concentración
                  desarrollada en laboratorios mexicanos certificados. ⭐
                  Tratamiento de 60 días para resultados sostenibles y
                  transformación completa de tu metabolismo. 🎯 Ideal para: ✓
                  Pérdida de peso acelerada ✓ Personas con metabolismo lento ✓
                  Quienes necesitan controlar ansiedad por comida ✓ Objetivos de
                  15+ kilos a perder ✓ Quienes buscan resultados serios y
                  duraderos ⚠️ Nota: No recomendado para personas con problemas
                  cardíacos, hipertensión, embarazo o lactancia
                </p>
                <form className="mb-8">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col">
                      <Label className="mb-2">Cantidad</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first-choice">
                            Option One
                          </SelectItem>
                          <SelectItem value="second-choice">
                            Option Two
                          </SelectItem>
                          <SelectItem value="third-choice">
                            Option Three
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2">Cantidad</Label>
                      <div className="flex flex-wrap gap-4">
                        <a
                          href="#"
                          className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-4 py-2"
                        >
                          30 cápsulas
                        </a>
                        <a
                          href="#"
                          className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-4 py-2"
                        >
                          60 cápsulas
                        </a>
                        <a
                          href="#"
                          className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-4 py-2 pointer-events-none opacity-25"
                        >
                          Pack familiar
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="grid grid-cols-[4rem_1fr] gap-x-4">
                      <div className="flex flex-col">
                        <Input type="number" placeholder="1" />
                      </div>
                      <Button title="Agregar al carrito" asChild>
                        <a href="https://wa.me/526312982043?text=Hola,%20quisiera%20información%20sobre%20Duo-60%20Fusion" target="_blank" rel="noopener noreferrer">
                          Agregar al carrito
                        </a>
                      </Button>
                    </div>
                    <div className="my-4">
                      <Button
                        title="Comprar ahora"
                        variant="secondary"
                        className="w-full"
                        asChild
                      >
                        <a href="https://wa.me/526312982043?text=Hola,%20quiero%20comprar%20Duo-60%20Fusion" target="_blank" rel="noopener noreferrer">
                          Comprar ahora
                        </a>
                      </Button>
                    </div>
                    <p className="text-center text-xs">
                      Envío gratis sobre $50
                    </p>
                  </div>
                </form>
                <Tabs defaultValue="tab-details">
                  <TabsList className="mb-5 flex-wrap items-center gap-6 md:mb-6">
                    <TabsTrigger
                      value="tab-details"
                      className="border-0 border-b-[1.5px] border-border-alternative px-0 py-2 duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
                    >
                      Detalles
                    </TabsTrigger>
                    <TabsTrigger
                      value="tab-shipping"
                      className="border-0 border-b-[1.5px] border-border-alternative px-0 py-2 duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
                    >
                      Envío
                    </TabsTrigger>
                    <TabsTrigger
                      value="tab-returns"
                      className="border-0 border-b-[1.5px] border-border-alternative px-0 py-2 duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
                    >
                      Devoluciones
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="tab-details"
                    className="data-[state=active]:animate-tabs"
                  >
                    <p>
                      Aceptamos devoluciones dentro de los 30 días posteriores a
                      la compra con nuestra garantía de satisfacción.
                    </p>
                  </TabsContent>
                  <TabsContent
                    value="tab-shipping"
                    className="data-[state=active]:animate-tabs"
                  >
                    <p>
                      Aceptamos devoluciones dentro de los 30 días posteriores a
                      la compra con nuestra garantía de satisfacción.
                    </p>
                  </TabsContent>
                  <TabsContent
                    value="tab-returns"
                    className="data-[state=active]:animate-tabs"
                  >
                    <p>
                      Aceptamos devoluciones dentro de los 30 días posteriores a
                      la compra con nuestra garantía de satisfacción.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
