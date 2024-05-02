import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { logout } from "@/system/helpers/auth";
import { getAccessToken } from "@/system/helpers/token";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import {
  AvatarIcon,
  ChevronDownIcon,
  HamburgerMenuIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = React.useState<{
    token: string | null;
    username: string;
  }>({
    token: null,
    username: "",
  });
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setUser({ token, username: "Admin" });
    } else {
      setUser({ token: null, username: "" });
    }
  }, []);

  const { setTheme } = useTheme();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b shadow-md fixed top-0 w-full bg-slate-100 z-50 dark:bg-black justify-between">
      <div className="flex flex-row gap-2">
        <Link className="flex items-center justify-center gap-2" href="/">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Sandee Inc</span>
          Sandee Inc
        </Link>
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-black p-1 rounded-md"
            >
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <Sheet>
          <SheetTrigger className="sm:hidden flex">
            <HamburgerMenuIcon className="h-5 w-5 stroke-2" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sandee Inc Menu</SheetTitle>
              <SheetDescription>
                <NavbarItem
                  router={router}
                  user={user}
                  className="flex flex-col"
                />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <NavbarItem
          className="hidden sm:flex flex-row"
          router={router}
          user={user}
        />
      </div>
    </header>
  );
}

type NavbarItemProps = {
  user: {
    token: string | null;
    username: string;
  };
  router: NextRouter;
  className?: string;
};

function NavbarItem(props: NavbarItemProps) {
  return (
    <nav className={cn("ml-auto gap-4 sm:gap-6 items-center", props.className)}>
      <Link
        className="text-sm font-medium hover:underline underline-offset-4"
        href="/"
      >
        Home
      </Link>
      <Link
        className="text-sm font-medium hover:underline underline-offset-4"
        href="/upload"
      >
        Upload
      </Link>
      <Link
        className="text-sm font-medium hover:underline underline-offset-4"
        href="/about"
      >
        About
      </Link>

      {props.user.token != null ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex gap-2" variant="outline">
              <AvatarIcon className="h-4 w-4" />
              <span>
                {props.user.username.charAt(0).toUpperCase() +
                  props.user.username.slice(1)}
              </span>
              <ChevronDownIcon className="h-4 w-4 ml-auto shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                // console.log("Logging out");
                await toast.promise(logout(), {
                  loading: "Logging out...",
                  success: (value) => {
                    // console.log(value);
                    if (value.status !== 200) {
                      return "An error occurred";
                    }
                    props.router.push("/auth/login");
                    return "Logged out successfully";
                  },
                  error: "An error occurred",
                });
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/auth/login"
          >
            Login
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/auth/register"
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
}

function MountainIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
