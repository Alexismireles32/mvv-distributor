"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronDown, RxChevronRight } from "react-icons/rx";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openOnMobileDropdownMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const openOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(true);
  };
  const closeOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(false);
  };
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";
  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";
  return {
    toggleMobileMenu,
    openOnDesktopDropdownMenu,
    closeOnDesktopDropdownMenu,
    openOnMobileDropdownMenu,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
    animateDropdownMenu,
    animateDropdownMenuIcon,
  };
};

export function Navbar6() {
  const useActive = useRelume();
  return (
    <section
      id="relume"
      className="sticky top-0 z-[999] flex min-h-16 w-full items-center border-b border-border-primary bg-background-primary px-[5%] shadow-sm md:min-h-18"
    >
      <div className="mx-auto flex size-full max-w-full items-center justify-between">
        <a href="/" className="flex items-center">
          <img
            src="https://res.cloudinary.com/dsulhqvza/image/upload/v1761550208/mvvnatural_pbzwrl.png"
            alt="MVV Natural - Suplementos Naturales"
            className="h-12 w-auto md:h-14"
          />
        </a>
        <div className="absolute hidden h-screen overflow-auto border-b border-border-primary bg-background-primary px-[5%] pb-24 pt-4 md:pb-0 lg:static lg:ml-6 lg:flex lg:h-auto lg:flex-1 lg:items-center lg:justify-between lg:border-none lg:bg-none lg:px-0 lg:pt-0">
          <div className="flex flex-col items-center lg:flex-row">
            <a
              href="/"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Inicio
            </a>
            <a
              href="/productos"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Productos
            </a>
            <a
              href="/catalogo"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Catálogo
            </a>
            <a
              href="/blog"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Blog
            </a>
            <a
              href="/testimonios"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Testimonios
            </a>
            <a
              href="/recursos"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Recursos
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button
              title="Contactar WhatsApp México"
              size="sm"
              asChild
              className="bg-como hover:bg-[#3d6849] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              <a href="https://wa.me/526312982043?text=Hola,%20quisiera%20saber%20más%20sobre%20los%20productos%20MVV%20Natural" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span className="text-lg">🇲🇽</span>
                WhatsApp México
              </a>
            </Button>
            <Button 
              title="Contactar WhatsApp USA" 
              variant="secondary" 
              size="sm" 
              asChild
              className="bg-white border-2 border-como text-como hover:bg-ecru-white font-medium transition-all duration-300"
            >
              <a href="https://wa.me/15202161443?text=Hola,%20quisiera%20saber%20más%20sobre%20los%20productos%20MVV%20Natural" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span className="text-lg">🇺🇸</span>
                WhatsApp USA
              </a>
            </Button>
          </div>
        </div>
        <button
          className="-mr-2 flex size-12 cursor-pointer flex-col items-center justify-center lg:hidden"
          onClick={useActive.toggleMobileMenu}
        >
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-como"
            animate={useActive.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: 8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-como"
            animate={useActive.animateMobileMenu}
            variants={{
              open: { width: 0, transition: { duration: 0.1 } },
              closed: {
                width: "1.5rem",
                transition: { delay: 0.3, duration: 0.2 },
              },
            }}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-como"
            animate={useActive.animateMobileMenuButtonSpan}
            variants={{
              open: { translateY: -8, transition: { delay: 0.1 } },
              rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
              closed: {
                translateY: 0,
                rotate: 0,
                transition: { duration: 0.2 },
              },
            }}
          />
        </button>
      </div>
      <AnimatePresence>
        <motion.div
          variants={{ open: { height: "100dvh" }, close: { height: "auto" } }}
          animate={useActive.animateMobileMenu}
          initial="close"
          exit="close"
          className="absolute left-0 right-0 top-full w-full overflow-hidden lg:hidden"
          transition={{ duration: 0.4 }}
        >
          <motion.div
            variants={{ open: { y: 0 }, close: { y: "-100%" } }}
            animate={useActive.animateMobileMenu}
            initial="close"
            exit="close"
            transition={{ duration: 0.4 }}
            className="absolute left-0 right-0 top-0 block h-dvh overflow-auto border-b border-border-primary bg-background-primary px-[5%] pb-8 pt-4"
          >
            <div className="flex flex-col">
              <a
                href="/"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Inicio
              </a>
              <a
                href="/productos"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Productos
              </a>
              <a
                href="/catalogo"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Catálogo
              </a>
              <a
                href="/blog"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Blog
                            </a>
                            <a
                href="/testimonios"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Testimonios
                            </a>
                            <a
                href="/recursos"
                className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
              >
                Recursos
              </a>
              
              {/* WhatsApp buttons for mobile menu */}
              <div className="mt-6 flex flex-col gap-3 border-t border-border-primary pt-6">
                <a
                  href="https://wa.me/526312982043?text=Hola,%20quisiera%20saber%20más%20sobre%20los%20productos%20MVV%20Natural"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-como hover:bg-[#3d6849] text-white font-semibold text-base px-6 py-4 rounded min-h-[44px] transition-all duration-300"
                >
                  <span className="text-xl">🇲🇽</span>
                  <span>WhatsApp México</span>
                            </a>
                            <a
                  href="https://wa.me/15202161443?text=Hola,%20quisiera%20saber%20más%20sobre%20los%20productos%20MVV%20Natural"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white border-2 border-como text-como hover:bg-ecru-white font-medium text-base px-6 py-4 rounded min-h-[44px] transition-all duration-300"
                >
                  <span className="text-xl">🇺🇸</span>
                  <span>WhatsApp USA</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
