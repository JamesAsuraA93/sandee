/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FmFkjPZC2cT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <div className="flex flex-col min-h-[100vh]">
        <div className="flex items-center justify-center flex-1">
          <div className="grid items-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl/none">
                404 Error
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                The page you were looking for does not exist. You can return to
                the homepage.
              </p>
            </div>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border  border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50  dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="/"
            >
              Go back to homepage
            </Link>
          </div>
        </div>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <nav className="flex flex-col gap-2 sm:flex-row">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="about"
            >
              About Us
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="contact"
            >
              Contact
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="terms"
            >
              Terms of Service
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
