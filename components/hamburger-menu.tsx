"use client";

import { useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "./ui/moving-border";
import { NavigationItems } from "./navigation-items";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <IconMenu2 className="h-6 w-6" />
      </Button>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <NavigationItems />
        </div>
      </Drawer>
    </>
  );
}

