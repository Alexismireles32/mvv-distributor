"use client";

import React from "react";

export function LegalPrivacidad() {
  return (
    <section id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold leading-tight md:mb-8 md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
            Política de Privacidad y Protección de Datos
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8 text-text-secondary">
            <p className="text-sm text-text-secondary">
              Última actualización: Enero 2025
            </p>

            <p className="text-lg font-semibold text-text-primary">
              En MVV Natural USA, respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos su información.
            </p>

            {/* 1. RESPONSABLE DEL TRATAMIENTO */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                1. Responsable del Tratamiento de Datos
              </h2>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Denominación:</strong> MVV Natural USA</li>
                <li><strong>Nombre comercial:</strong> MVV Natural</li>
                <li><strong>Sitio web:</strong> www.mvvnatural.com</li>
                <li><strong>Email de contacto:</strong> privacidad@mvvnatural.com</li>
              </ul>
              <p>
                Operamos en <strong>México</strong> y <strong>Estados Unidos</strong>, cumpliendo con las leyes de protección de datos de ambos países.
              </p>
            </div>

            {/* 2. INFORMACIÓN QUE RECOPILAMOS */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                2. Información que Recopilamos
              </h2>
              <p>
                Recopilamos diferentes tipos de información según su interacción con nuestro sitio web:
              </p>
              
              <h3 className="mb-3 mt-4 text-xl font-semibold text-text-primary">
                2.1 Información que usted nos proporciona:
              </h3>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Datos de contacto:</strong> nombre, apellidos, número de teléfono, email, dirección postal</li>
                <li><strong>Información de compra:</strong> productos adquiridos, método de pago, historial de pedidos</li>
                <li><strong>Información de WhatsApp:</strong> número de teléfono, mensajes intercambiados, consultas realizadas</li>
                <li><strong>Datos de salud (opcional):</strong> peso actual, objetivos de pérdida de peso, condiciones médicas relevantes (solo si usted decide compartirlos para asesoría personalizada)</li>
              </ul>

              <h3 className="mb-3 mt-4 text-xl font-semibold text-text-primary">
                2.2 Información que recopilamos automáticamente:
              </h3>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Datos de navegación:</strong> páginas visitadas, tiempo en el sitio, enlaces clicados</li>
                <li><strong>Información técnica:</strong> dirección IP, tipo de navegador, sistema operativo, idioma del navegador</li>
                <li><strong>Cookies y tecnologías similares:</strong> identificadores únicos, preferencias del usuario</li>
                <li><strong>Datos de dispositivo:</strong> tipo de dispositivo, resolución de pantalla, ubicación aproximada (basada en IP)</li>
              </ul>
            </div>

            {/* 3. FINALIDAD DEL TRATAMIENTO */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                3. ¿Para Qué Usamos Su Información?
              </h2>
              <p>
                Utilizamos sus datos personales para las siguientes finalidades:
              </p>

              <h3 className="mb-3 mt-4 text-xl font-semibold text-text-primary">
                3.1 Finalidades principales (necesarias para el servicio):
              </h3>
              <ul className="ml-6 list-disc space-y-2">
                <li>Procesar y gestionar sus pedidos de productos</li>
                <li>Coordinar envíos y entregas de productos</li>
                <li>Responder a sus consultas por WhatsApp, email o formularios de contacto</li>
                <li>Proporcionar asesoría personalizada sobre productos</li>
                <li>Gestionar pagos y facturación</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
              </ul>

              <h3 className="mb-3 mt-4 text-xl font-semibold text-text-primary">
                3.2 Finalidades secundarias (con su consentimiento):
              </h3>
              <ul className="ml-6 list-disc space-y-2">
                <li>Enviar comunicaciones comerciales sobre productos, promociones y ofertas</li>
                <li>Realizar estudios de mercado y encuestas de satisfacción</li>
                <li>Mejorar nuestros productos y servicios basándonos en su feedback</li>
                <li>Personalizar su experiencia en el sitio web</li>
                <li>Enviar recordatorios sobre productos que dejó en carrito (si aplica)</li>
              </ul>

              <p className="mt-4 rounded-lg bg-blue-50 p-4 border-l-4 border-blue-500">
                <strong>Importante:</strong> Puede retirar su consentimiento para las finalidades secundarias en cualquier momento sin que esto afecte los servicios principales contratados.
              </p>
            </div>

            {/* 4. BASE LEGAL */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                4. Base Legal para el Tratamiento
              </h2>
              <p>
                Procesamos sus datos personales basándonos en:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Ejecución de contrato:</strong> para procesar sus pedidos y entregarle los productos</li>
                <li><strong>Consentimiento:</strong> para enviarle comunicaciones comerciales y marketing</li>
                <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios y prevenir fraudes</li>
                <li><strong>Cumplimiento legal:</strong> para cumplir con obligaciones fiscales y regulatorias</li>
              </ul>
            </div>

            {/* 5. COMPARTIR INFORMACIÓN */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                5. ¿Con Quién Compartimos Su Información?
              </h2>
              <p>
                <strong>NO vendemos ni alquilamos</strong> su información personal a terceros. Sin embargo, podemos compartir sus datos con:
              </p>

              <h3 className="mb-3 mt-4 text-xl font-semibold text-text-primary">
                5.1 Proveedores de servicios necesarios:
              </h3>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Servicios de mensajería:</strong> Estafeta, Fedex, USPS (solo información de envío)</li>
                <li><strong>Procesadores de pago:</strong> PayPal, Mercado Pago, Stripe (solo datos de transacción)</li>
                <li><strong>Plataformas de comunicación:</strong> WhatsApp, Meta (Facebook)</li>
                <li><strong>Servicios de hosting:</strong> donde almacenamos datos del sitio web</li>
                <li><strong>Herramientas de análisis:</strong> Google Analytics (datos anonimizados)</li>
              </ul>

              <h3 className="mb-3 mt-4 text-xl font-semibold text-text-primary">
                5.2 Requisitos legales:
              </h3>
              <p>
                Podemos divulgar información cuando sea necesario para:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Cumplir con leyes, regulaciones o procesos legales</li>
                <li>Proteger nuestros derechos legales o propiedad</li>
                <li>Prevenir fraude o actividades ilegales</li>
                <li>Proteger la seguridad de nuestros usuarios</li>
              </ul>
            </div>

            {/* 6. TRANSFERENCIAS INTERNACIONALES */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                6. Transferencias Internacionales de Datos
              </h2>
              <p>
                Debido a que operamos en México y Estados Unidos, sus datos pueden ser transferidos y procesados en cualquiera de estos países. Implementamos medidas de seguridad adecuadas para proteger sus datos durante estas transferencias.
              </p>
              <p>
                Algunos de nuestros proveedores de servicios (como Google, Meta, Cloudflare) pueden estar ubicados fuera de su país de residencia. En estos casos, nos aseguramos de que existan garantías adecuadas de protección de datos.
              </p>
            </div>

            {/* 7. SEGURIDAD DE DATOS */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                7. Seguridad de Sus Datos Personales
              </h2>
              <p>
                Implementamos medidas técnicas y organizativas para proteger sus datos:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Cifrado SSL/TLS:</strong> en todas las comunicaciones del sitio web</li>
                <li><strong>Acceso restringido:</strong> solo personal autorizado tiene acceso a datos personales</li>
                <li><strong>Contraseñas seguras:</strong> para todos los sistemas internos</li>
                <li><strong>Backups regulares:</strong> para prevenir pérdida de información</li>
                <li><strong>Monitoreo de seguridad:</strong> para detectar accesos no autorizados</li>
                <li><strong>Capacitación del personal:</strong> en mejores prácticas de protección de datos</li>
              </ul>
              <p className="mt-4 rounded-lg bg-yellow-50 p-4 border-l-4 border-yellow-500">
                <strong>Nota:</strong> Ningún método de transmisión por internet es 100% seguro. Aunque implementamos las mejores prácticas de la industria, no podemos garantizar seguridad absoluta.
              </p>
            </div>

            {/* 8. CONSERVACIÓN DE DATOS */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                8. ¿Cuánto Tiempo Conservamos Sus Datos?
              </h2>
              <p>
                Conservamos sus datos personales durante el tiempo necesario para:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Clientes activos:</strong> mientras mantenga relación comercial con nosotros</li>
                <li><strong>Obligaciones legales:</strong> según lo requerido por ley (generalmente 5-10 años para datos fiscales)</li>
                <li><strong>Marketing:</strong> hasta que retire su consentimiento o solicite eliminación</li>
                <li><strong>Datos de navegación:</strong> generalmente 24 meses máximo</li>
              </ul>
              <p>
                Una vez cumplido el plazo, procedemos a eliminar o anonimizar sus datos de forma segura.
              </p>
            </div>

            {/* 9. SUS DERECHOS */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                9. Sus Derechos sobre Sus Datos Personales
              </h2>
              <p>
                Usted tiene derecho a:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Acceso:</strong> saber qué datos tenemos sobre usted</li>
                <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos</li>
                <li><strong>Cancelación/Eliminación:</strong> solicitar la eliminación de sus datos</li>
                <li><strong>Oposición:</strong> oponerse al procesamiento de sus datos para ciertos fines</li>
                <li><strong>Portabilidad:</strong> recibir sus datos en formato estructurado</li>
                <li><strong>Limitación del tratamiento:</strong> restringir cómo usamos sus datos</li>
                <li><strong>Retirar consentimiento:</strong> en cualquier momento para comunicaciones comerciales</li>
              </ul>

              <h3 className="mb-3 mt-4 text-xl font-semibold text-text-primary">
                ¿Cómo ejercer sus derechos?
              </h3>
              <p>
                Para ejercer cualquiera de estos derechos, puede contactarnos:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Email:</strong> privacidad@mvvnatural.com</li>
                <li><strong>Asunto:</strong> "Ejercicio de Derechos ARCO" o "Privacy Rights Request"</li>
                <li><strong>Información a incluir:</strong> nombre completo, email, descripción de su solicitud</li>
              </ul>
              <p>
                Responderemos a su solicitud en un plazo máximo de <strong>20 días hábiles</strong>.
              </p>
            </div>

            {/* 10. COOKIES */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                10. Uso de Cookies y Tecnologías Similares
              </h2>
              <p>
                Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web. Las cookies son pequeños archivos de texto que se almacenan en su dispositivo.
              </p>

              <h3 className="mb-3 mt-4 text-xl font-semibold text-text-primary">
                Tipos de cookies que utilizamos:
              </h3>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Cookies estrictamente necesarias:</strong> para el funcionamiento básico del sitio</li>
                <li><strong>Cookies de rendimiento:</strong> para analizar cómo se usa el sitio (Google Analytics)</li>
                <li><strong>Cookies de funcionalidad:</strong> para recordar sus preferencias</li>
                <li><strong>Cookies de publicidad:</strong> para mostrar anuncios relevantes (Meta Pixel, Google Ads)</li>
              </ul>

              <p className="mt-4">
                <strong>Gestión de cookies:</strong> Puede configurar su navegador para rechazar cookies, pero esto puede afectar la funcionalidad del sitio. La mayoría de navegadores permiten:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Ver qué cookies están instaladas</li>
                <li>Bloquear todas o algunas cookies</li>
                <li>Eliminar cookies existentes</li>
              </ul>
            </div>

            {/* 11. MENORES DE EDAD */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                11. Protección de Menores de Edad
              </h2>
              <p className="rounded-lg bg-red-50 p-4 border-l-4 border-red-500">
                <strong>Restricción de edad:</strong> Nuestro sitio web y productos están destinados exclusivamente a personas <strong>mayores de 18 años</strong>. NO recopilamos intencionalmente información de menores de edad.
              </p>
              <p>
                Si descubrimos que hemos recopilado datos de un menor de edad sin verificación de consentimiento parental, tomaremos medidas inmediatas para eliminar esa información de nuestros sistemas.
              </p>
            </div>

            {/* 12. CAMBIOS EN LA POLÍTICA */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                12. Cambios a Esta Política de Privacidad
              </h2>
              <p>
                Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación en el sitio web.
              </p>
              <p>
                Le notificaremos sobre cambios significativos mediante:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Aviso destacado en el sitio web</li>
                <li>Email a la dirección que nos proporcionó (si corresponde)</li>
                <li>Actualización de la fecha de "Última actualización" al inicio de este documento</li>
              </ul>
              <p>
                Le recomendamos revisar periódicamente esta política para estar informado sobre cómo protegemos su información.
              </p>
            </div>

            {/* 13. LEGISLACIÓN APLICABLE */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                13. Legislación Aplicable y Autoridades de Control
              </h2>
              <p>
                Esta Política de Privacidad se rige por:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>México:</strong> Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</li>
                <li><strong>Estados Unidos:</strong> Leyes estatales aplicables, incluyendo CCPA (California Consumer Privacy Act) cuando corresponda</li>
              </ul>
              <p className="mt-4">
                <strong>Derechos adicionales para residentes de California:</strong>
              </p>
              <p>
                Si reside en California, tiene derechos adicionales bajo CCPA, incluyendo el derecho a optar por no participar en la "venta" de información personal (aunque no vendemos datos personales).
              </p>
            </div>

            {/* 14. CONTACTO */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                14. Contacto y Quejas
              </h2>
              <p>
                Para cualquier pregunta, solicitud o queja relacionada con la privacidad y protección de sus datos:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Email de privacidad:</strong> privacidad@mvvnatural.com</li>
                <li><strong>Email general:</strong> contacto@mvvnatural.com</li>
                <li><strong>WhatsApp México:</strong> +52 631 298 2043</li>
                <li><strong>WhatsApp USA:</strong> +1 520 216 1443</li>
              </ul>
              <p className="mt-4">
                Si no está satisfecho con nuestra respuesta, tiene derecho a presentar una queja ante la autoridad de protección de datos de su país:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>México:</strong> Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI)</li>
                <li><strong>USA/California:</strong> California Attorney General's Office</li>
              </ul>
            </div>

            {/* FOOTER NOTE */}
            <div className="border-t pt-6">
              <p className="text-sm text-text-secondary">
                <strong>Última revisión:</strong> Enero 2025. Esta Política de Privacidad complementa nuestro Aviso Legal y Términos de Uso. Al utilizar nuestro sitio web, acepta los términos de esta política.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

