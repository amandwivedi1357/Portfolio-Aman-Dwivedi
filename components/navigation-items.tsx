import Link from "next/link";
import { useState } from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandVite,
  IconCode,
  IconHeartQuestion,
  IconHome,
  IconUserSearch,
} from "@tabler/icons-react";

const links = [
  {
    title: "Home",
    icon: <IconHome className="h-6 w-6" />,
    sectionId: "home",
  },
  {
    title: "About me",
    icon: <IconUserSearch className="h-6 w-6" />,
    sectionId: "about",
  },
  {
    title: "Skills",
    icon: <IconCode className="h-6 w-6" />,
    sectionId: "skills",
  },
  {
    title: "Projects",
    icon: <IconBrandVite className="h-6 w-6" />,
    sectionId: "projects",
  },
  // {
  //   title: "Testimonials",
  //   icon: <IconHeartQuestion className="h-6 w-6" />,
  //   sectionId: "testimonials",
  // },
  {
    title: "LinkedIn",
    icon: <IconBrandLinkedin className="h-6 w-6" />,
    href: "https://linkedin.com/in/amandwivedi1357-ad",
  },
  {
    title: "GitHub",
    icon: <IconBrandGithub className="h-6 w-6" />,
    href: "https://github.com/amandwivedi1357",
  },
  
];

export function NavigationItems({ onItemClick }: { onItemClick?: () => void }) {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav>
      <ul className="space-y-4 z-100">
        {links.map((link) => (
          <li key={link.sectionId || link.href}>
            {link.sectionId ? (
              <button 
                onClick={() => {
                  scrollToSection(link.sectionId);
                  onItemClick?.();
                }}
                className="flex text-white items-center space-x-2 w-full text-left"
              >
                {link.icon}
                <span>{link.title}</span>
              </button>
            ) : (
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex text-white items-center space-x-2"
                onClick={onItemClick}
              >
                {link.icon}
                <span>{link.title}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
