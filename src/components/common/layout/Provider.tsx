import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

export default function Provider(props: Props) {
  return (
    <div className="flex flex-col min-h-[100dvh] relative">
      <Navbar />
      {props.children}
      <Card className="bottom-6 right-6 fixed p-0">
        <CardHeader className="p-2 flex items-center">
          <CardTitle>
            <span className="text-lg">Contact us on </span>
          </CardTitle>
          <Link href={"https://lin.ee/erPOQOV"} target="_blank">
            <Image
              src="/lineIcon.png"
              alt="iconLine"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
          {/* <CardTitle></CardTitle>
          <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        {/* <CardContent>
          <p>Card Content</p>
        </CardContent> */}
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </div>
  );
}
