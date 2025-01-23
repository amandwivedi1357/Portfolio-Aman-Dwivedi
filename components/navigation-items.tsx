import Link from "next/link";
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
    href: "/",
  },
  {
    title: "About me",
    icon: <IconUserSearch className="h-6 w-6" />,
    href: "/about",
  },
  {
    title: "Skills",
    icon: <IconCode className="h-6 w-6" />,
    href: "/skills",
  },
  {
    title: "Projects",
    icon: <IconBrandVite className="h-6 w-6" />,
    href: "/projects",
  },
  // {
  //   title: "Testimonials",
  //   icon: <IconHeartQuestion className="h-6 w-6" />,
  //   href: "/testimonials",
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
  return (
    <nav>
      <ul className="space-y-4 z-100">
        {links.map((link) => (
          <li key={link.href}>
            <Link 
              href={link.href} 
              className="flex text-white items-center space-x-2"
              onClick={onItemClick}
            >
              {link.icon}
              <span>{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
