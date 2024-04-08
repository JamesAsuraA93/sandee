import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Provider from "@/components/common/layout/Provider";

import axios from "axios";
import { toast } from "sonner";
import { setAccessToken } from "@/system/helpers/token";
import { useRouter } from "next/router";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50).refine(val => {
    
    return (
      val.match(/[a-z]/) !== null && // ต้องมีตัวอักษรตัวพิมพ์เล็กอย่างน้อย 1 ตัว
      val.match(/[A-Z]/) !== null && // ต้องมีตัวอักษรตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว
      val.match(/[0-9]/) !== null && // ต้องมีตัวเลขอย่างน้อย 1 ตัว
      val.match(/[!@#$%^&*()_+]/) !== null // ต้องมีตัวอักษรพิเศษอย่างน้อย 1 ตัว
    );
  },{message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"}),
  confirmPassword: z.string().min(8).max(50),
  confirmTerms: z.boolean(),
});

async function register(data: z.infer<typeof formSchema>) {
  // waiting 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (data.password !== data.confirmPassword) {
    throw new Error("Passwords do not match");
  }
  try {
    const response = await axios.post("localhost:8002/signup", {
      name: data.name,
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

export default function Register() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmTerms: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);

    if (values.password !== values.confirmPassword) {
      toast.warning("Passwords do not match");
      return "Passwords do not match";
    }

    if (!values.confirmTerms) {
      toast.warning("You must agree to the terms and conditions");
      return "You must agree to the terms and conditions";
    }

    toast.promise(register(values), {
      loading: "Registering...",
      success: (value) => {
        if (value.status !== 200) {
          return "An error occurred";
        }

        setAccessToken(value.data.token);
        router.push("/upload");
        return "Registered successfully";
      },
      error: "An error occurred",
    });
  }

  return (
    <Provider>
      <div className="flex items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-lg space-y-6 border rounded-md p-[3rem] shadow-lg w-full"
          >
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Register</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your information to create an account
              </p>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmTerms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Checkbox
                        required
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="terms"
                        name="confirmTerms"
                      />
                      <FormLabel
                        className="ml-2 leading-none cursor-pointer"
                        htmlFor="terms"
                      >
                        I agree to the
                        <Link className="underline ml-1" href="#">
                          terms and conditions
                        </Link>
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Register
            </Button>

            <div className="text-center text-sm">
              <Link className="underline" href="/auth/login">
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </Form>
        {/* <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your information to create an account
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Jane Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="jane@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" required type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" required type="password" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox id="terms" />
            <Label className="ml-2 leading-none" htmlFor="terms">
              I agree to the
              <Link className="underline ml-1" href="#">
                terms and conditions
              </Link>
            </Label>
          </div>
        </div>
        <Button className="w-full" type="submit">
          Register
        </Button>
      </div> */}
      </div>
    </Provider>
  );
}
