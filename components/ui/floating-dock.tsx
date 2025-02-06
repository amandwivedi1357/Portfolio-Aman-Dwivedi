/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/
"use client";

import { cn } from "@/lib/utils";
import {
  IconHome,
  IconUserSearch,
  IconCode,
  IconBrandVite,
  IconBrandLinkedin,
  IconBrandGithub,
  IconDownload,
  IconMessage,
  IconLayoutNavbarCollapse,
} from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

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
    title: "Let's Connect",
    icon: <IconMessage className="h-6 w-6" />,
    onClick: () => {
      const connectSection = document.getElementById('lets-connect');
      connectSection?.scrollIntoView({ behavior: 'smooth' });
    }
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
  {
    title: "Download Resume",
    icon: <IconDownload className="h-6 w-6" />,
    onClick: () => {
      window.open('/Aman_Dwivedi_fw20_0455.pdf', '_blank');
    }
  },
  
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

export const FloatingDock = ({
  desktopClassName,
  mobileClassName,
  items
}: {
  desktopClassName?: string;
  mobileClassName?: string;
  items: {
    title: string;
    icon: React.ReactNode;
    onClick?: () => void;
    href?: string;
  }[];
}) => {
  return (
    <>
      <FloatingDockDesktop className={desktopClassName} />
      <FloatingDockMobile className={mobileClassName} />
    </>
  );
};

export const FloatingDockDemo = () => {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-6 w-6" />,
      onClick: () => scrollToSection("home"),
    },
    {
      title: "About me",
      icon: <IconUserSearch className="h-6 w-6" />,
      onClick: () => scrollToSection("about"),
    },
    {
      title: "Skills",
      icon: <IconCode className="h-6 w-6" />,
      onClick: () => scrollToSection("skills"),
    },
    {
      title: "Projects",
      icon: <IconBrandVite className="h-6 w-6" />,
      onClick: () => scrollToSection("projects"),
    },
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

  return FloatingDock({ items: links });
};

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const FloatingDockMobile = ({
  className,
}: {
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const mouseX = useMotionValue(0);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 flex justify-center w-full"
          >
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-2">
              <div className="flex space-x-4 items-center">
                {links.map((link) => (
                  link.sectionId ? (
                    <button 
                      key={link.sectionId}
                      onClick={() => {
                        scrollToSection(link.sectionId);
                        setOpen(false);
                      }}
                      className="text-white hover:bg-white/10 p-2 rounded-full"
                    >
                      {link.icon}
                    </button>
                  ) : link.onClick ? (
                    <button 
                      key={link.title}
                      onClick={link.onClick}
                      className="text-white hover:bg-white/10 p-2 rounded-full"
                    >
                      {link.icon}
                    </button>
                  ) : (
                    <a 
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:bg-white/10 p-2 rounded-full"
                    >
                      {link.icon}
                    </a>
                  )
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        <button 
          onClick={() => setOpen(!open)}
          className="bg-black/40 backdrop-blur-md p-2 rounded-full"
        >
          <IconLayoutNavbarCollapse className="text-white" />
        </button>
      </AnimatePresence>
    </div>
  );
};

const FloatingDockDesktop = ({
  className,
}: {
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      onMouseMove={(e) => {
        if (!containerRef.current) return;
        const { left } = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
      }}
      className={cn(
        "flex w-max mx-auto bg-black/40 backdrop-blur-md rounded-2xl p-2", 
        className
      )}
    >
      {links.map((link) => (
        link.sectionId ? (
          <IconContainer
            key={link.sectionId}
            mouseX={mouseX}
            title={link.title}
            icon={link.icon}
            onClick={() => scrollToSection(link.sectionId)}
          />
        ) : link.onClick ? (
          <IconContainer
            key={link.title}
            mouseX={mouseX}
            title={link.title}
            icon={link.icon}
            onClick={link.onClick}
          />
        ) : (
          <IconContainer
            key={link.href}
            mouseX={mouseX}
            title={link.title}
            icon={link.icon}
            href={link.href}
          />
        )
      ))}
    </div>
  );
};

const IconContainer = ({
  mouseX,
  title,
  icon,
  href,
  onClick,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const TooltipWrapper = ({ children, title }: { children: React.ReactNode; title: string }) => {
    return (
      <Tooltip.Provider delayDuration={200} skipDelayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className={cn(
                "z-50 select-none rounded-md bg-black/80 px-3 py-1.5 text-xs text-white",
                "will-change-[transform,opacity] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
                "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
                "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade",
                "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade"
              )}
              sideOffset={5}
            >
              {title}
              <Tooltip.Arrow className="fill-black/80" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  };

  if (href) {
    return (
      <TooltipWrapper title={title}>
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex justify-center items-center text-white hover:bg-white/10 rounded-full p-2 mx-1 cursor-pointer"
        >
          {icon}
        </a>
      </TooltipWrapper>
    );
  }

  return (
    <TooltipWrapper title={title}>
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        onClick={onClick}
        className="group relative flex justify-center items-center text-white hover:bg-white/10 rounded-full p-2 mx-1 cursor-pointer"
      >
        {icon}
      </button>
    </TooltipWrapper>
  );
};
