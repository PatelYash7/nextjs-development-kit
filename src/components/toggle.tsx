"use client";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="ring-0 focus:ring-0 hover:bg-none "
        asChild
      >
        <Button
          variant="outline"
          size="icon"
          className="border-[1px] border-black dark:border-[#3861A2] rounded-full hover:bg-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white text-black focus:ring-0 "
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 \  font-bold dark:text-gray-400   dark:hover:text-white text-gray-700 hover:text-black" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 font-bold dark:text-gray-400   dark:hover:text-white text-gray-700 hover:text-black" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[1000] dark:bg-black " align="end">
        <DropdownMenuItem
          onClick={() => {
            const newTheme = resolvedTheme === "dark" ? "light" : "dark";
            setTheme(newTheme);
            document.cookie = `theme=${newTheme}; path=/`;
          }}
          className="bg-[#000000] text-white dark:bg-transparent "
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            const newTheme = resolvedTheme === "dark" ? "light" : "dark";
            setTheme(newTheme);
            document.cookie = `theme=${newTheme}; path=/`;
          }}
          className="dark:bg-[#242426]"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
