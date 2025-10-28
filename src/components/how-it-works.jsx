"use client";

import React from "react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Escoge Lo Que Tu Cuerpo Necesita",
      description: "¿Metabolismo lento? Duo 60 Fusion. ¿No puedes controlar el hambre? SOS Burn. ¿Quieres detox completo? 30 Day Detox. O mándanos mensaje y te decimos exactamente cuál te conviene según tu peso y meta. Sin vueltas."
    },
    {
      number: "02",
      title: "Háblanos por WhatsApp (Respondemos Rápido)",
      description: "Nada de formularios largos ni correos que nadie contesta. WhatsApp directo - México o USA. Te contestamos en minutos, te explicamos cómo tomar el producto y cuánto pedir. Pregunta lo que sea, en serio."
    },
    {
      number: "03",
      title: "Te Llega en Días, No Semanas",
      description: "México: 1-3 días con Estafeta o Fedex. USA: 3-5 días con USPS. Paquete discreto con rastreo. Pagas como te acomode - OXXO, transferencia, Zelle, PayPal. Lo que tengas a la mano."
    },
    {
      number: "04",
      title: "Empieza a Ver Cambios (Desde la Primera Semana)",
      description: "Primera semana: menos hambre, más energía. Segunda semana: ropa más suelta. Al mes: todos te preguntan qué hiciste. A los 2-3 meses: eres otra persona. Y lo mejor - sin matarte de hambre."
    }
  ];

  return (
    <section className="px-[5%] py-10 md:py-16 lg:py-20 bg-background-primary">
      <div className="container">
        <div className="mb-8 text-center md:mb-12 lg:mb-16">
          <h2 className="mb-4 text-xl font-bold leading-tight xxs:text-2xl sm:text-3xl sm:mb-5 md:mb-6 md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight">
            Cómo Bajar de Peso Rápido Naturalmente (Sin Trucos Raros)
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-secondary xxs:text-base md:text-lg">
            Nada complicado. Así es como miles de personas en México y USA están bajando de peso con nuestros <strong>suplementos para adelgazar rápido</strong>.
          </p>
        </div>
        
          <div className="grid gap-6 xxs:gap-8 md:grid-cols-2 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-como text-2xl font-bold text-white md:h-20 md:w-20 md:text-3xl">
                  {step.number}
                </div>
              </div>
              <div className="pt-2">
                <h3 className="mb-3 text-lg font-bold leading-tight xxs:text-xl md:text-2xl md:text-3xl">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary xxs:text-base md:text-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

