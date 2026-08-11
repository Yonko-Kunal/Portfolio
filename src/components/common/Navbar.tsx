"use client";

import { heroConfig } from "@/config/Hero";
import Container from "@/components/common/Container";
import { ThemeToggleButton } from "./ThemeSwitch";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState, useEffect } from "react";
import Logo from "../../../public/assets/Logo";
import { Separator } from "../ui/separator";

// Create motion component outside the Navbar component
const MotionContainer = motion.create(Container);

const Navbar = () => {
  const navItems = [
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Blogs",
      href: "/blogs",
    },
    {
      title: "Work",
      href: "/work-experience",
    },
  ];

  const { avatar } = heroConfig;
  const [hoverd, setHoverd] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <MotionContainer
      animate={{
        width: isMobile
          ? scrolled
            ? "90%"
            : "100%"
          : scrolled
            ? "36%"
            : "100%",
        top: isMobile
          ? scrolled
            ? "2%"
            : "0rem"
          : scrolled
            ? "0.75rem"
            : "0rem",
      }}
      style={{
        border: scrolled ? "" : "none",
      }}
      transition={{
        ease: isMobile ? "circInOut" : "easeInOut",
        duration: isMobile ? 0.4 : 0.35,
      }}
      className="liquidGlass-wrapper sticky z-50 rounded-[15px] py-1 md:rounded-[20px]"
    >
      {/* SVG Filter for Liquid Glass Effect - Inside Container */}
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id="glass-distortion">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              numOctaves="1"
              seed="5"
              result="turbulence"
            />
            <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
            <feDisplacementMap in="SourceGraphic" in2="softMap" scale="200" />
          </filter>
        </defs>
      </svg>

      {/* Liquid Glass Effect Layer */}
      <div className={`liquidGlass-effect ${scrolled ? "scrolled" : ""}`} />

      <motion.nav className="relative z-10 flex items-center justify-between px-2">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div>
              {/* <Image className='rounded-full transition-all duration-300 ease-in-out hover:scale-90'
                                src={avatar}
                                alt="avatar"
                                width={48}
                                height={48}
                            /> */}
              <Logo className="h-10 w-10 text-black transition-all duration-300 ease-in-out md:h-10 md:w-10 dark:text-white" />
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <div>
            <ul className="flex gap-1 p-2 pr-0 md:p-1">
              <li className="transition-ease gap-4">
                {navItems.map((items, idx) => (
                  <Link
                    className={`relative px-2 py-1 font-mono md:text-[12px] text-sm font-medium hover:text-yellow-500 ${usePathname() === items.href ? "text-yellow-500" : ""
                      }`}
                    href={items.href}
                    key={idx}
                    onMouseEnter={() => setHoverd(idx)}
                    onMouseLeave={() => setHoverd(null)}
                  >
                    {hoverd === idx && (
                      <motion.span
                        transition={{
                          ease: "anticipate",
                          delay: 0.01,
                        }}
                        layoutId="hovered-span"
                        className="absolute inset-0 mt-auto h-px w-full bg-yellow-500"
                      />
                    )}
                    {items.title}
                  </Link>
                ))}
              </li>
            </ul>
          </div>
          <Separator orientation="vertical" className="h-6! w-px!" />
          <ThemeToggleButton variant="circle" start="top-right" blur />
        </div>
      </motion.nav>
    </MotionContainer>
  );
};

export default Navbar;
