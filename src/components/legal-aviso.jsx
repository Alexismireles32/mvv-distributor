"use client";

import React from "react";

export function LegalAviso() {
  return (
    <section id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold leading-tight md:mb-8 md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
            Aviso Legal y Términos de Uso
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8 text-text-secondary">
            <p className="text-sm text-text-secondary">
              Última actualización: Enero 2025
            </p>

            {/* 1. IDENTIFICACIÓN Y TITULARIDAD */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                1. Identificación y Titularidad del Sitio Web
              </h2>
              <p>
                En cumplimiento con el deber de información dispuesto en la Ley 34/2002 de Servicios de la Sociedad de la Información y el Comercio Electrónico (LSSI-CE) de 11 de julio, y en conformidad con las leyes aplicables en México y Estados Unidos, se facilitan los siguientes datos:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Denominación social:</strong> MVV Natural USA</li>
                <li><strong>Nombre comercial:</strong> MVV Natural</li>
                <li><strong>Sitio web:</strong> https://www.mvvnatural.com</li>
                <li><strong>Email de contacto:</strong> contacto@mvvnatural.com</li>
                <li><strong>Países de operación:</strong> México y Estados Unidos</li>
              </ul>
            </div>

            {/* 2. OBJETO */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                2. Objeto y Aceptación
              </h2>
              <p>
                El presente Aviso Legal regula el uso y utilización del sitio web www.mvvnatural.com, del que es titular MVV Natural USA. La navegación por el sitio web atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.
              </p>
              <p>
                <strong>MVV Natural</strong> se dedica a la comercialización de <strong>suplementos naturales para control de peso</strong>, productos de bienestar y salud natural, con envíos a <strong>México y Estados Unidos</strong>. Todos nuestros productos son de origen natural y cumplen con las regulaciones sanitarias aplicables.
              </p>
            </div>

            {/* 3. CONDICIONES DE ACCESO Y USO */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                3. Condiciones de Acceso y Utilización
              </h2>
              <p>
                El sitio web y sus servicios son de acceso libre y gratuito. No obstante, MVV Natural condiciona la utilización de algunos de los servicios ofrecidos en su web a la previa cumplimentación del correspondiente formulario o registro.
              </p>
              <p className="font-semibold">
                El usuario se compromete a:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Hacer un uso adecuado y lícito del sitio web</li>
                <li>No utilizar el sitio web para actividades ilícitas o contrarias a la buena fe</li>
                <li>No introducir virus informáticos ni realizar acciones que puedan dañar el sistema</li>
                <li>Proporcionar información veraz y actualizada en los formularios de contacto</li>
                <li>No suplantar la identidad de otros usuarios</li>
              </ul>
            </div>

            {/* 4. PRODUCTOS Y DISCLAIMER MÉDICO */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                4. Información sobre Productos y Descargo de Responsabilidad Médica
              </h2>
              <p className="rounded-lg bg-yellow-50 p-4 border-l-4 border-yellow-500">
                <strong>AVISO IMPORTANTE:</strong> Los productos ofrecidos en este sitio web son <strong>suplementos alimenticios naturales</strong> y NO son medicamentos. No están destinados a diagnosticar, tratar, curar o prevenir ninguna enfermedad.
              </p>
              <p>
                Los resultados pueden variar de persona a persona. Los testimonios y casos de éxito presentados son reales pero representan experiencias individuales y no garantizan resultados específicos para todos los usuarios.
              </p>
              <p>
                <strong>Recomendaciones importantes:</strong>
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Consulte a su médico antes de iniciar cualquier programa de pérdida de peso o suplementación</li>
                <li>No suspenda medicamentos recetados sin consultar a su médico</li>
                <li>No recomendado para mujeres embarazadas, en lactancia, o menores de 18 años</li>
                <li>Si tiene condiciones médicas preexistentes, consulte a un profesional de la salud</li>
                <li>Los suplementos deben combinarse con alimentación balanceada y ejercicio para mejores resultados</li>
              </ul>
            </div>

            {/* 5. PROCESO DE COMPRA Y ENVÍOS */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                5. Proceso de Compra y Envíos
              </h2>
              <p>
                Las compras en MVV Natural se realizan a través de WhatsApp. Al contactarnos, nuestros asesores le proporcionarán información detallada sobre:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Productos disponibles y precios actualizados</li>
                <li>Métodos de pago aceptados (transferencia bancaria, OXXO, PayPal, Zelle, etc.)</li>
                <li>Costos de envío según su ubicación</li>
                <li>Tiempos de entrega estimados (México: 1-3 días, USA: 3-5 días)</li>
              </ul>
              <p>
                <strong>Política de envíos:</strong>
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Todos los envíos incluyen número de rastreo</li>
                <li>Empaque discreto y seguro</li>
                <li>Envío el mismo día si el pedido se realiza antes de las 2 PM (hora México)</li>
                <li>No nos hacemos responsables por retrasos causados por el servicio de mensajería</li>
              </ul>
            </div>

            {/* 6. PRECIOS Y FORMAS DE PAGO */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                6. Precios y Formas de Pago
              </h2>
              <p>
                Los precios publicados en el sitio web son orientativos. Para conocer el precio final y vigente, contacte a nuestros asesores por WhatsApp. Los precios pueden variar sin previo aviso.
              </p>
              <p>
                <strong>Formas de pago aceptadas:</strong>
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>México:</strong> Transferencia bancaria, depósito OXXO, Mercado Pago, Kueski Pay</li>
                <li><strong>USA:</strong> Zelle, PayPal, CashApp, tarjetas de crédito/débito</li>
              </ul>
              <p>
                El pedido se procesará una vez confirmado el pago.
              </p>
            </div>

            {/* 7. POLÍTICA DE DEVOLUCIONES */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                7. Política de Devoluciones y Garantías
              </h2>
              <p>
                Debido a la naturaleza de nuestros productos (suplementos alimenticios), <strong>NO aceptamos devoluciones ni reembolsos</strong> una vez que el producto ha sido enviado, excepto en casos de:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Producto defectuoso o dañado durante el envío</li>
                <li>Error en el producto enviado</li>
                <li>Producto caducado o próximo a caducar</li>
              </ul>
              <p>
                En estos casos, deberá contactarnos dentro de las <strong>48 horas</strong> posteriores a la recepción del producto con evidencia fotográfica. Evaluaremos el caso y procederemos con reemplazo o reembolso según corresponda.
              </p>
            </div>

            {/* 8. PROPIEDAD INTELECTUAL */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                8. Propiedad Intelectual e Industrial
              </h2>
              <p>
                Todos los contenidos del sitio web www.mvvnatural.com, incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual de MVV Natural USA o de terceros que han autorizado su uso.
              </p>
              <p>
                Queda prohibida la reproducción, distribución, comunicación pública y transformación de cualquier contenido del sitio web sin la autorización expresa y por escrito de MVV Natural.
              </p>
            </div>

            {/* 9. ENLACES EXTERNOS */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                9. Enlaces a Terceros
              </h2>
              <p>
                El sitio web puede contener enlaces a sitios web de terceros. MVV Natural no controla ni se hace responsable del contenido de dichos sitios web externos. El acceso a estos sitios es responsabilidad exclusiva del usuario.
              </p>
            </div>

            {/* 10. PROTECCIÓN DE DATOS */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                10. Protección de Datos Personales
              </h2>
              <p>
                Para obtener información sobre cómo recopilamos, utilizamos y protegemos sus datos personales, consulte nuestra <a href="/politica-de-privacidad" className="text-como hover:underline font-semibold">Política de Privacidad</a>.
              </p>
              <p>
                Cumplimos con las regulaciones de protección de datos aplicables en México (Ley Federal de Protección de Datos Personales) y Estados Unidos (incluyendo CCPA de California cuando aplique).
              </p>
            </div>

            {/* 11. EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                11. Exclusión de Garantías y Responsabilidad
              </h2>
              <p>
                MVV Natural no se hace responsable de:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>La disponibilidad técnica, exactitud, veracidad, validez o legalidad de sitios ajenos a su propiedad</li>
                <li>Daños y perjuicios causados por un uso inadecuado del sitio web</li>
                <li>Interrupciones del servicio, errores en el acceso al sitio web, o falta de disponibilidad</li>
                <li>Resultados específicos en la pérdida de peso, ya que estos varían según cada persona</li>
                <li>Reacciones adversas no declaradas en el etiquetado del producto</li>
              </ul>
            </div>

            {/* 12. LEY APLICABLE Y JURISDICCIÓN */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                12. Ley Aplicable y Jurisdicción
              </h2>
              <p>
                Las presentes Condiciones Generales se rigen por la legislación mexicana y estadounidense según corresponda al país del usuario.
              </p>
              <p>
                Para la resolución de controversias, las partes se someterán a los juzgados y tribunales competentes según la ubicación del usuario.
              </p>
            </div>

            {/* 13. MODIFICACIONES */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                13. Modificaciones del Aviso Legal
              </h2>
              <p>
                MVV Natural se reserva el derecho de efectuar modificaciones en este Aviso Legal cuando lo considere oportuno. Los cambios serán efectivos desde su publicación en el sitio web.
              </p>
              <p>
                Es responsabilidad del usuario revisar periódicamente este Aviso Legal para estar informado de posibles modificaciones.
              </p>
            </div>

            {/* 14. CONTACTO */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                14. Contacto
              </h2>
              <p>
                Para cualquier duda, sugerencia o reclamación relacionada con el uso del sitio web, puede contactarnos:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong>Email:</strong> contacto@mvvnatural.com</li>
                <li><strong>WhatsApp México:</strong> +52 631 298 2043</li>
                <li><strong>WhatsApp USA:</strong> +1 520 216 1443</li>
                <li><strong>Sitio web:</strong> www.mvvnatural.com</li>
              </ul>
            </div>

            {/* FOOTER NOTE */}
            <div className="border-t pt-6">
              <p className="text-sm text-text-secondary">
                <strong>Nota importante:</strong> Este sitio web y sus productos están destinados exclusivamente a mayores de 18 años. Los suplementos alimenticios no deben utilizarse como sustituto de una dieta variada y equilibrada. Manténgase fuera del alcance de los niños.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

