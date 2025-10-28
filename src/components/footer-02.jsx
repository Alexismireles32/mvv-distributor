"use client";

import React from "react";
import { BiLogoFacebookCircle, BiLogoInstagram } from "react-icons/bi";

export function Footer2() {
  return (
    <footer id="relume" className="bg-background-secondary px-[5%] py-10 md:py-12 lg:py-14">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-8 pb-8 md:grid-cols-2 md:gap-12 md:pb-10 lg:grid-cols-3 lg:pb-12">
          {/* Logo and Social */}
          <div className="flex flex-col gap-4">
            <a href="/" className="flex items-center">
              <img
                src="https://res.cloudinary.com/dsulhqvza/image/upload/v1761550208/mvvnatural_pbzwrl.png"
                alt="MVV Natural"
                className="h-10 w-auto md:h-12"
              />
            </a>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-ecru-white transition-colors" aria-label="Facebook">
                <BiLogoFacebookCircle className="size-7 md:size-6" />
              </a>
              <a href="#" className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-ecru-white transition-colors" aria-label="Instagram">
                <BiLogoInstagram className="size-7 md:size-6" />
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex flex-col items-start justify-start">
            <h2 className="mb-3 font-semibold text-base text-white md:mb-4">Navegación</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="flex items-center py-2 text-sm text-white/90 md:py-1.5 min-h-[44px] hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/productos" className="flex items-center py-2 text-sm text-white/90 md:py-1.5 min-h-[44px] hover:text-white transition-colors">
                  Productos
                </a>
              </li>
              <li>
                <a href="/testimonios" className="flex items-center py-2 text-sm text-white/90 md:py-1.5 min-h-[44px] hover:text-white transition-colors">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="/blog" className="flex items-center py-2 text-sm text-white/90 md:py-1.5 min-h-[44px] hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contacto" className="flex items-center py-2 text-sm text-white/90 md:py-1.5 min-h-[44px] hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-start justify-start">
            <h2 className="mb-3 font-semibold text-base text-white md:mb-4">Legal</h2>
            <ul className="space-y-2">
              <li>
                <a href="/aviso-legal" className="flex items-center py-2 text-sm text-white/90 md:py-1.5 min-h-[44px] hover:text-white transition-colors">
                  Aviso Legal
                </a>
              </li>
              <li>
                <a href="/politica-de-privacidad" className="flex items-center py-2 text-sm text-white/90 md:py-1.5 min-h-[44px] hover:text-white transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/preguntas-frecuentes" className="flex items-center py-2 text-sm text-white/90 md:py-1.5 min-h-[44px] hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px w-full bg-white/20" />
        
        {/* Copyright */}
        <div className="flex flex-col items-center justify-center pt-6 text-center md:pt-8">
          <p className="text-sm text-white/80">
            © 2025 MVV Natural USA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
