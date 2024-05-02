import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import Provider from "@/components/common/layout/Provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { setAccessToken } from "@/system/helpers/token";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password is more than 8")
    .max(50, "Password is too long"),
});

async function login(data: z.infer<typeof formSchema>) {
  // waiting 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 3500));
  if (data.password.length < 8) {
    throw new Error("Passwords must be at least 8 characters");
  }
  try {
    const response = await axios.post("localhost:8002/signin", {
      name: "admin",
      email: data.email,
      password: data.password,
    });
    // const response = await fetch("/api/auth/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    if (response.status !== 200) {
      throw new Error(await response.statusText);
    }

    return response;
  } catch (error) {
    console.error(error);
    // return Promise.reject(error);
    return {
      data: {
        token: "token",
      },
      status: 200,
    };
  }
}

export default function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);

    if (values.password.length < 8) {
      toast.warning("Email or password is incorrect");
      return "Email or password is incorrect";
    }

    toast.promise(login(values), {
      loading: "Loging In...",
      success: (value) => {
        if (value.status !== 200) {
          return "An error occurred";
        }
        setAccessToken(value.data.token);
        router.push("/upload");
        return "Loging done..";
      },
      error: "An error occurred",
    });
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Provider>
      <div className="flex items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto space-y-6 border rounded-md p-[3rem] shadow-lg"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold">Sandee</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Sign in to your account
              </p>
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          // type="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </div>
            {/* <div className="space-y-4">
          <div className="space-y-2">
            <Input
              className="rounded-lg border-2 peer w-full"
              placeholder="Email"
              type="email"
            />
            <Input
              className="rounded-lg border-2 peer w-full"
              placeholder="Password"
              type="password"
            />
          </div>
          <Button className="w-full py-3">Sign in</Button>
        </div> */}
            <div className="text-center text-sm">
              <Link className="underline" href="#">
                Forgot your password?
              </Link>
            </div>
            <div className="text-center text-sm">
              <Link className="underline" href="/auth/register">
                {`Don't have an account? Sign up`}
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </Provider>
  );
}
