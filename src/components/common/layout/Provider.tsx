import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/system/helpers/auth";
import { getAccessToken, removeAccessToken } from "@/system/helpers/token";
import { AvatarIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

export default function Provider(props: Props) {
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

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b shadow-md fixed top-0 w-full bg-slate-100 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Sandee Inc</span>
          Sandee Inc
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
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

          {user.token != null ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex gap-2" variant="outline">
                  <AvatarIcon className="h-4 w-4" />
                  <span>
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
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
                        console.log(value);
                        if (value.status !== 200) {
                          return "An error occurred";
                        }
                        router.push("/auth/login");
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
          {/* <Link
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
          </Link> */}
        </nav>
      </header>
      <div className="mt-[2rem]">{props.children}</div>
    </div>
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
