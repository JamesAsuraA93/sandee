import Provider from "@/components/common/layout/Provider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, FileIcon, MinusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default function Upload() {
  const [lasFileInput, setLasFileInput] = React.useState<{
    file: File | null;
    url: string;
  }>({
    file: null,
    url: "",
  });

  const [lasFileRangeInput, setLasFileRangeInput] = React.useState<{
    fileOne: File | null;
    fileTwo: File | null;
    urlOne: string;
    urlTwo: string;
  }>({
    fileOne: null,
    fileTwo: null,
    urlOne: "",
    urlTwo: "",
  });
  return (
    <Provider>
      <div className="p-10">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl">Upload LAS Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="single" className="w-[700px] py-4">
              <TabsList className="w-full">
                <TabsTrigger className="w-full" value="single">
                  single
                </TabsTrigger>
                <TabsTrigger className="w-full" value="range">
                  range
                </TabsTrigger>
              </TabsList>
              <TabsContent value="single">
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle className="text-2xl">
                      Single File Input
                    </CardTitle>
                    <CardDescription>
                      Upload a single file to view the visualization.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-2 pt-3">
                      <Label htmlFor="single">Please Input LAS File</Label>
                      <Input
                        accept=".las"
                        id="single"
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setLasFileInput({
                              file,
                              url: URL.createObjectURL(file),
                            });
                          }
                        }}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileIcon className="w-6 h-6 opacity-50" />
                      <Link href="#">View file</Link>
                    </div>
                    <div className="w-full aspect-[16/9] border-dashed border-2 border-gray-200 rounded-lg flex items-center justify-center text-2xl font-semibold">
                      Image display here
                    </div>
                    <Button type="button" variant="outline">
                      Upload
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="range">
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle className="text-2xl">Range File Input</CardTitle>
                    <CardDescription>
                      Upload a 2 files to view the visualization.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-row gap-2 items-end">
                      <div className="grid w-full max-w-sm items-center gap-2 pt-3">
                        <Label htmlFor="single">Please Input LAS File</Label>
                        <Input
                          accept=".las"
                          id="single"
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setLasFileRangeInput({
                                ...lasFileRangeInput,
                                fileOne: file,
                                urlOne: URL.createObjectURL(file),
                              });
                            }
                          }}
                        />
                      </div>
                      <span className="pb-2">and</span>
                      <div className="grid w-full max-w-sm items-center gap-2 pt-3">
                        <Label htmlFor="single">Please Input LAS File</Label>
                        <Input
                          accept=".las"
                          id="single"
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setLasFileRangeInput({
                                ...lasFileRangeInput,
                                fileTwo: file,
                                urlTwo: URL.createObjectURL(file),
                              });
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            className="w-[200px] justify-start text-left"
                            variant="outline"
                          >
                            <CalendarIcon className="mr-1 h-4 w-4 -translate-x-1" />
                            Select start date
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar mode="range" numberOfMonths={2} />
                        </PopoverContent>
                      </Popover>
                      <MinusIcon className="h-4 w-4 opacity-50" />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            className="w-[200px] justify-start text-left"
                            variant="outline"
                          >
                            <CalendarIcon className="mr-1 h-4 w-4 -translate-x-1" />
                            Select end date
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar mode="range" numberOfMonths={2} />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileIcon className="w-6 h-6 opacity-50" />
                      <Link href="#">View file</Link>
                    </div>
                    <div className="grid-cols-2 gap-2 grid">
                      <div className="w-full aspect-[16/9] border-dashed border-2 border-gray-200 rounded-lg flex items-center justify-center text-2xl font-semibold">
                        Image display here
                      </div>
                      <div className="w-full aspect-[16/9] border-dashed border-2 border-gray-200 rounded-lg flex items-center justify-center text-2xl font-semibold">
                        Image display here
                      </div>
                    </div>
                    <Button type="button" variant="outline">
                      Upload
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Provider>
  );
}
