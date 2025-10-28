"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { useWhatsApp } from "./home-wrapper";

export function Faq7() {
  const onOpenWhatsApp = useWhatsApp();
  
  const handleClick = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      // Fallback: buscar el botón flotante directamente
      const floatButton = document.querySelector('[aria-label="Contactar por WhatsApp"]');
      if (floatButton) {
        floatButton.click();
      }
    }
  };
  
  return (
    <section id="relume" className="px-[5%] py-10 md:py-16 lg:py-20">
      <div className="container w-full max-w-4xl">
        <div className="mb-8 text-center md:mb-12 lg:mb-16">
          <h1 className="mb-4 text-2xl font-bold leading-tight xxs:text-3xl sm:text-4xl sm:mb-5 md:mb-6 md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
            Preguntas Frecuentes sobre Productos para Bajar de Peso
          </h1>
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            Resuelve todas tus dudas sobre nuestros suplementos naturales para adelgazar. 15 años de experiencia respaldándonos.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 xxs:gap-y-8 md:gap-x-12 md:gap-y-10">
          <div>
            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              ¿Cuánto peso puedo perder con sus productos naturales?
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Nuestros clientes pierden en promedio <strong>15-25 kilos en 2-3 meses</strong> con nuestro sistema completo. Los resultados varían según tu metabolismo, peso inicial y constancia. En la primera semana notarás menos antojos y más energía, y la pérdida de peso es gradual y sin rebote. Contamos con miles de testimonios reales que lo comprueban.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              ¿Son seguros los quemadores de grasa naturales? ¿Tienen efectos secundarios?
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Nuestros productos son <strong>100% naturales</strong> y seguros. A diferencia de pastillas químicas, nuestros suplementos contienen extractos de plantas como té verde, garcinia cambogia y ginseng. Algunos clientes pueden experimentar leve aumento de energía al inicio (similar a tomar café), pero sin nerviosismo ni insomnio. No recomendamos para embarazadas o personas con condiciones cardíacas sin consultar a su médico.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              ¿Cuánto tiempo tarda en llegar mi pedido a México y USA?
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              <strong>México:</strong> 1-3 días hábiles con Estafeta o Fedex. <strong>USA:</strong> 3-5 días hábiles con USPS correo postal. Todos los envíos incluyen número de rastreo para que sigas tu paquete en tiempo real. Empacamos discretamente y enviamos el mismo día si ordenas antes de las 2 PM (hora de México).
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              ¿Necesito hacer dieta estricta o ejercicio para ver resultados?
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              <strong>No es obligatorio, pero ayuda muchísimo.</strong> Nuestros productos funcionan solos: aceleran tu metabolismo, queman grasa y controlan el apetito automáticamente. Sin embargo, combinados con alimentación balanceada (no dieta extrema) y actividad física moderada (caminar 30 minutos diarios), los resultados se duplican. Muchos clientes adelgazan sin ejercicio, solo reduciendo porciones y evitando comida chatarra.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              ¿Cuál es el mejor producto para empezar a bajar de peso?
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              Nuestro <strong>bestseller es Duo-60 Fusion Xtreme</strong> - el quemador de grasa más potente. Es perfecto para principiantes porque acelera el metabolismo 3x, controla antojos y quema grasa abdominal. Si buscas resultados más rápidos, combínalo con <strong>SOS Burn</strong> para efecto termogénico. Contáctanos por WhatsApp y te asesoramos gratis según tu peso y objetivos.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              ¿Qué formas de pago aceptan en México y USA?
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              <strong>México:</strong> Transferencia bancaria, depósito OXXO, Mercado Pago y Kueski Pay (compra ahora, paga después). <strong>USA:</strong> Zelle, PayPal, CashApp y tarjetas de crédito/débito. Todos los pagos son 100% seguros. Te enviamos confirmación inmediata y tu número de rastreo en menos de 24 horas.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              ¿Puedo tomar varios productos juntos para adelgazar más rápido?
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              <strong>¡Sí! Muchos clientes combinan productos</strong> para resultados acelerados. Las combinaciones más efectivas son: Duo-60 Fusion + SOS Burn (para quemar grasa máximo), Duo-60 + 30 Day Detox (para limpiar y adelgazar), o Lipo HD + Chupa Panza (para grasa localizada). Te recomendamos contactarnos por WhatsApp para diseñar tu plan personalizado según tu meta de kilos a perder.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              ¿Por qué sus productos funcionan mejor que otros del mercado?
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              <strong>15 años de experiencia</strong> perfeccionando fórmulas naturales efectivas. A diferencia de marcas comerciales que usan ingredientes baratos, nosotros usamos extractos concentrados de máxima pureza. Nuestros productos atacan el problema desde 3 ángulos: aceleran metabolismo, queman grasa almacenada Y controlan apetito. Además, brindamos asesoría personalizada gratis - no te dejamos solo en el proceso.
            </p>
          </div>
        </div>
            <div className="mx-auto mt-10 max-w-xl text-center md:mt-14 lg:mt-16">
              <h3 className="mb-3 text-xl font-bold xxs:text-2xl md:mb-4 md:text-3xl md:leading-tight lg:text-4xl">
            ¿Tienes Más Preguntas? ¡Estamos Para Ayudarte!
          </h3>
          <p className="mb-6 text-base leading-relaxed text-text-secondary md:mb-8 md:text-lg">
            Nuestros asesores expertos responden en menos de 5 minutos por WhatsApp. Te ayudamos a elegir el producto perfecto para tu meta.
          </p>
          <div className="mt-6 md:mt-8">
            <button 
              onClick={handleClick}
              className="w-full sm:w-auto bg-como hover:bg-[#3d6849] text-white font-bold text-base px-10 py-5 min-h-[44px] md:text-lg md:px-12 md:py-6 shadow-xl hover:shadow-2xl active:scale-95 md:hover:scale-105 transition-all duration-300 rounded-full"
            >
              <span className="flex items-center justify-center gap-2 md:gap-3">
                <span>Contáctanos por WhatsApp</span>
                <span className="text-xl md:text-2xl">💬</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
