import { heroConfig } from "@/config/Hero";
import Image from "next/image";
import { Tilt } from "../motion-primitives/tilt";
import { TextLoop } from "../motion-primitives/text-loop";

import Container from "@/components/common/Container";

import BlueTick from "@/components/svgs/BlueTick";
import Code from "@/components/svgs/Code";
import MapPin from "@/components/svgs/MapPin";
import Phone from "@/components/svgs/Phone";
import Message from "@/components/svgs/Message";
import Website from "../svgs/Website";
import Gender from "../svgs/Gender";
import Spotify from "@/components/landing/Spotify";
import HeroAvatar from "./HeroAvatar";
import IndianFlag from "../svgs/IndianFlag";

const customCssForSvg =
  "dark:text-[#9F9FA9] text-[#71717B] size-5 flex shrink-0 items-center justify-center rounded-sm border border-muted-foreground/15 bg-muted ring-1 ring-muted-foreground/15 ring-edge ring-offset-1 ring-offset-background p-0.5";

export default function Hero() {
  const {
    name,
    avatar,
    banner,
    role,
    location,
    email,
    phone,
    website,
    gender,
  } = heroConfig;

  return (
    <Container className="mx-auto mb-8 max-w-5xl">
      {/* Image */}
      <div className="relative">
        {/* avatar */}
        <div>
          <HeroAvatar avatar={avatar} />
          <IndianFlag className="absolute top-0 z-30 size-8 translate-x-2 translate-y-15 2xl:size-10 xl:size-8 md:size-8 2xl:translate-x-2 xl:translate-x-3 md:translate-x-3 2xl:translate-y-45 xl:translate-y-33 md:translate-y-36" />
          <div className="absolute top-0 z-30 translate-x-22 translate-y-28 2xl:translate-x-28 xl:translate-x-23 md:translate-x-25 2xl:translate-y-62 xl:translate-y-45 md:translate-y-50">
            <Spotify />
          </div>
        </div>

        {/* banner */}

        <div className="dottedBackground mb-12 h-[130px] object-cover 2xl:h-[250px] xl:h-[180px] md:h-[200px]">
          <Tilt rotationFactor={5} isRevese>
            <div className="overlay-1 absolute inset-0 z-10"></div>
            <Image
              src={banner}
              alt="hero"
              height={400}
              width={1200}
              placeholder="blur"
              className="mb-12 h-[130px] object-cover 2xl:h-[250px] xl:h-[180px] md:h-[200px]"
            />
          </Tilt>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-8 md:mt-16">
        <div className="flex flex-col items-start gap-2 xl:gap-1 md:gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl leading-tight font-bold md:text-xl xl:text-[24px] 2xl:text-3xl">
              {name}
            </h1>
            <BlueTick />
          </div>
          <TextLoop>
            {heroConfig.title.map((title, index) => (
              <span
                key={index}
                className="text-secondary font-mono 2xl:text-sm xl:text-[12px] text-sm leading-relaxed"
              >
                {title}
              </span>
            ))}
          </TextLoop>
        </div>

        {/* Description */}

        <div className="flex flex-col gap-2 border border-black/10 p-4 font-mono text-sm leading-relaxed md:gap-3 dark:border-white/10">
          <div className="flex w-65 flex-col gap-3 md:w-full">
            <div className="flex items-center gap-3">
              <div className={customCssForSvg}>
                <Code />
              </div>
              <p>{role}</p>
            </div>
            <div className="grid grid-flow-row grid-rows-3 gap-2 md:grid-flow-col">
              <div className="flex items-center gap-3">
                <div className={customCssForSvg}>
                  <MapPin />
                </div>
                <p>{location}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className={customCssForSvg}>
                  <Phone />
                </div>
                <p className="underline-offset-4 hover:underline">
                  <a
                    href="tel:+919870429459"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {phone}
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className={customCssForSvg}>
                  <Message />
                </div>
                <p className="underline-offset-4 hover:underline">
                  <a
                    href="mailto:kunalroy267483@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {email}
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className={customCssForSvg}>
                  <Website />
                </div>
                <p className="underline-offset-4 hover:underline">
                  <a
                    href="https://yonko-portfolio.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {website}
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className={customCssForSvg}>
                  <Gender />
                </div>
                <p>{gender}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
