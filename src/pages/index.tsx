import Provider from "@/components/common/layout/Provider";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // const router = useRouter();
  return (
    <Provider>
      <main className="flex-1 min-h-screen">
        <section className="w-full relative  min-h-[16rem] md:min-h-[24rem]">
          <Image
            alt="hero"
            src={"/banner_sea.jpg"}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </section>
        <section className="w-full py-6 md:py-12 lg:py-24 h-full">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Calculate the Difference Measure
                </h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Upload two .las files to calculate the difference measure
                  between them.
                </p>
              </div>
              {/* <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="file"
                  />
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="file"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      router.push("/upload");
                    }}
                  >
                    Calculate
                  </Button>
                </form>
              </div> */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          {/* <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Difference Measure
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                The difference measure between the two .las files is 25%.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">Download</Button>
              </form>
            </div>
          </div> */}
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </Provider>
  );
}
