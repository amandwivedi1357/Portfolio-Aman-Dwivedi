"use client";

import { useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";
import { Drawer } from "@/components/ui/drawer";
import { NavigationItems } from "./navigation-items";
import { Button } from "./ui/button";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <IconMenu2 className="h-16 w-16" />
      </Button>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <NavigationItems onItemClick={() => setIsOpen(false)} />
        </div>
      </Drawer>
    </>
  );
}

