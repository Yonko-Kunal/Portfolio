"use client";

import Image from "next/image";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { SpotifyData, fetcher } from "@/components/landing/Spotify";

interface HeroAvatarProps {
  avatar: string;
}

export default function HeroAvatar({ avatar }: HeroAvatarProps) {
  const { data } = useSWR<SpotifyData>("/api/spotify", fetcher, {
    refreshInterval: 5000,
  });

  return (
    <Image
      className={cn(
        "ring-offset-background absolute z-11 flex size-24 translate-x-5 translate-y-15 rounded-full bg-white ring-offset-2 xl:size-25 2xl:size-30 md:size-20 md:translate-x-6 2xl:translate-y-43 xl:translate-y-30 md:translate-y-35",
        data?.isPlaying && "ring-3 ring-[#1DB954]",
      )}
      src={avatar}
      alt="hero"
      width={200}
      height={200}
    />
  );
}
