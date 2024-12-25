"use client";

import Image from "next/image";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandHackerrank,
  IconBrandLinkedin,
  IconBrandVite,
  IconBrandX,
  IconExchange,
  IconHeartQuestion,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconUserSearch,
} from "@tabler/icons-react";
import { IconCode } from "@tabler/icons-react";


export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-300 dark:text-neutral-200" />
      ),
      href: "/",
    },
    {
      title: "About me",
      icon: (
        <IconUserSearch className="h-full w-full text-neutral-300 dark:text-neutral-200" />
      ),
      href: "/about",
    },
    {
      title: "Skills",
      icon: (
        <IconCode className="h-full w-full text-neutral-300 dark:text-neutral-200" />
      ),
      href: "/skills",
    },
    {
      title: "Projects",
      icon: (
        <div className="h-full w-full flex items-center justify-center">
          <IconBrandVite
            className="h-full w-full text-neutral-300 dark:text-neutral-200"
          />
        </div>
      ),
      href: "/projects",
    },
    {
      title: "Testimonials",
      icon: (
        <IconHeartQuestion className="h-full w-full text-neutral-300 dark:text-neutral-200" />
      ),
      href: "/testimonials",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-300 dark:text-neutral-200" />
      ),
      href: "https://linkedin.com/in/amandwivedi1357-ad",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-300 dark:text-neutral-200" />
      ),
      href: "https://github.com/amandwivedi1357",
    },
  ];
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}