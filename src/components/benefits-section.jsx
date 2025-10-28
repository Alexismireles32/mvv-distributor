"use client";

import React from "react";
import { BiCheck } from "react-icons/bi";

export function BenefitsSection() {
  const benefits = [
    {
      title: "Tu Metabolismo Trabajando al 100%",
      description: "¿Sientes que ya probaste todo y tu cuerpo no responde? Nuestros suplementos para acelerar metabolismo despiertan a tu cuerpo de ese modo ahorro de energía. Como debería funcionar desde el principio."
    },
    {
      title: "Adiós a los Antojos Nocturnos",
      description: "Esa ansiedad de las 9 PM que te manda directo al refri. Nuestras pastillas para controlar el apetito naturales la eliminan. No es fuerza de voluntad - es química natural que balancea tus hormonas del hambre."
    },
    {
      title: "Quema Grasa Donde Más Te Molesta",
      description: "Ese gordito del abdomen que no se va ni a golpes. Nuestros productos naturales para quemar grasa abdominal atacan justo ahí. Porque la grasa no se distribuye igual en todo el cuerpo - y lo sabemos."
    },
    {
      title: "Sin Rebote (En Serio)",
      description: "Ya sabes cómo es: bajas 10 kilos, subes 12. Nos pasa a todos. Por eso diseñamos suplementos para bajar de peso sin rebote que te enseñan a mantener tu peso nuevo. Es la diferencia entre una dieta temporal y un cambio real."
    },
    {
      title: "Naturales de Verdad",
      description: "No esas pastillas llenas de quién-sabe-qué que te ponen nervioso y no te dejan dormir. Nuestros quemadores de grasa naturales son extractos de plantas. Tu abuelita aprobaría los ingredientes."
    },
    {
      title: "Se Integran a Tu Vida Real",
      description: "Porque tenemos trabajo, familia, y mil cosas más. Tomas las cápsulas con tu café de la mañana y listo. No necesitas convertirte en atleta olímpico ni comer solo lechuga. Vida normal, resultados reales."
    }
  ];

  return (
    <section className="px-[5%] py-10 md:py-16 lg:py-20 bg-white">
      <div className="container">
        <div className="mb-8 max-w-3xl md:mb-12 lg:mb-16">
          <h2 className="mb-4 text-xl font-bold leading-tight xxs:text-2xl sm:text-3xl sm:mb-5 md:mb-6 md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight">
            Por Qué Nuestros Suplementos Naturales Sí Funcionan (Y Otros No)
          </h2>
          <p className="text-sm leading-relaxed text-text-secondary xxs:text-base md:text-lg">
            No más falsas promesas. Aquí está la verdad sobre cómo funcionan realmente los <strong>productos para adelgazar efectivos</strong>.
          </p>
        </div>
        
          <div className="grid gap-6 xxs:gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-como">
                  <BiCheck className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold leading-tight xxs:text-xl md:text-2xl">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary xxs:text-base md:text-lg">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

