import Provider from "@/components/common/layout/Provider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
import LasUploadConfig from "@/components/user/LasUploadConfig";
import { getAccessToken } from "@/system/helpers/token";
import { CalendarIcon, FileIcon, MinusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "sonner";

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

  const [historyFileUpload, setHistoryFileUpload] = React.useState<
    {
      oldFile: File | null;
      computedFile: File | null;
    }[]
  >([]);

  // useEffect(() => {
  //   return () => {
  //     if (lasFileInput.file) {
  //       URL.revokeObjectURL(lasFileInput.url);
  //     }
  //     if (lasFileRangeInput.fileOne) {
  //       URL.revokeObjectURL(lasFileRangeInput.urlOne);
  //     }
  //     if (lasFileRangeInput.fileTwo) {
  //       URL.revokeObjectURL(lasFileRangeInput.urlTwo);
  //     }
  //   };
  // }, []);

  // check auth from cookie

  const router = useRouter();

  useEffect(() => {
    // check auth from cookie
    const token = getAccessToken();

    if (!token) {
      // redirect to login page
      router.push("/auth/login");
    }
  }, [router]);

  const [isCalculate, setIsCalculate] = React.useState(false);

  const [dataFile, setDataFile] = React.useState<{
    file: File | null;
    url: string;
  }>({
    file: null,
    url: "",
  });

  const onCalculate = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 10000);
    });

    await setDataFile({
      file: lasFileInput.file,
      url: lasFileInput.url,
    });
  };

  const onSubmit = async () => {
    if (!lasFileInput.file) {
      toast.error("Please upload a file");
      return;
    }

    // waiting 2 seconds
    toast.promise(onCalculate(), {
      loading: "Calculating...",
      success: () => {
        setIsCalculate(true);
        if (lasFileInput.file) {
          setHistoryFileUpload([
            ...historyFileUpload,
            {
              oldFile: lasFileInput.file,
              computedFile: null,
            },
          ]);
        }
        // setHistoryFileUpload([
        //   ...historyFileUpload,
        //   {
        //     oldFile: lasFileInput.file,
        //     computedFile: dataFile.file,
        //   },
        // ]);

        return "Calculation completed";
      },
      error: () => {
        setIsCalculate(false);
        return "Error occurred";
      },
    });
  };

  const [tab, setTab] = React.useState<"single" | "range">("single");

  return (
    <Provider>
      <div className="p-10">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl">Upload LAS Zone</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-row w-full gap-4">
            <Tabs
              value={tab}
              className="max-w-[700px] py-4 w-full"
              onValueChange={(value) => setTab(value as "single" | "range")}
            >
              <TabsList className="w-full">
                <TabsTrigger className="w-full" value="single">
                  single
                </TabsTrigger>
                <TabsTrigger className="w-full" value="range">
                  range
                </TabsTrigger>
              </TabsList>
              <TabsContent value="single" className="space-y-2">
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
                            toast.success("File uploaded successfully");
                          } else {
                            toast.error("File not uploaded");
                          }
                        }}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileIcon className="w-6 h-6 opacity-50" />
                      <Link href="#" className="truncate  max-w-[10rem]">
                        View file : {lasFileInput.url}
                      </Link>
                    </div>
                    {isCalculate ? (
                      <div className="w-full relative min-h-[20rem]">
                        <AspectRatio ratio={16 / 9}>
                          <Image
                            src="/temp/temp.png"
                            alt="Image"
                            className="rounded-md object-cover"
                            fill
                          />
                        </AspectRatio>
                      </div>
                    ) : (
                      <div className="w-full aspect-[16/9] border-dashed border-2 border-gray-200 rounded-lg flex items-center justify-center text-2xl font-semibold">
                        Image display here
                      </div>
                    )}
                    <Button type="button" variant="outline" onClick={onSubmit}>
                      Submit file and Calculate
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle className="text-2xl">
                      List of Uploaded Files
                    </CardTitle>
                    <CardDescription>
                      List of uploaded files. Original file and computed file.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-2 pt-3 grid-flow-row">
                      {historyFileUpload.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div className="flex flex-col items-start gap-2">
                            <div className="flex flex-row items-center gap-1">
                              <FileIcon className="w-6 h-6 z-0" />
                              <h4>Original File {index + 1}</h4>
                            </div>
                            {/* <h4>Original File {index + 1}</h4>
                            <FileIcon className="w-6 h-6 z-0" /> */}
                            <Link href="#" className="truncate  max-w-[10rem]">
                              View file : {file.oldFile?.name}
                            </Link>

                            {/* download */}
                            <Button
                              type="button"
                              onClick={() => {
                                if (!file.oldFile) {
                                  return;
                                }
                                const url = URL.createObjectURL(file.oldFile);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = file.oldFile.name;
                                a.click();
                                URL.revokeObjectURL(url);
                              }}
                            >
                              Download Original File
                            </Button>
                          </div>

                          {file.computedFile && (
                            <div className="flex flex-col items-start gap-2">
                              <div className="flex flex-row items-center gap-1">
                                <FileIcon className="w-6 h-6 z-0" />
                                <h4>Computed File {index + 1}</h4>
                              </div>
                              <Link
                                href="#"
                                className="truncate  max-w-[10rem]"
                              >
                                View file : {file.computedFile?.name}
                              </Link>

                              {/* download */}
                              <Button
                                type="button"
                                onClick={() => {
                                  if (!file.computedFile) {
                                    return;
                                  }
                                  const url = URL.createObjectURL(
                                    file.computedFile
                                  );
                                  const a = document.createElement("a");
                                  a.href = url;
                                  a.download = file.computedFile.name;
                                  a.click();
                                  URL.revokeObjectURL(url);
                                }}
                              >
                                Download Computed File
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
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
                    <div className="flex flex-col md:flex-row gap-2 items-start md:items-end">
                      <div className="grid w-full max-w-sm items-center gap-2 pt-3">
                        <Label htmlFor="single">
                          Please Input LAS File {`(Start)`}
                        </Label>
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
                      <span className="pb-2 hidden md:block">and</span>
                      <div className="grid w-full max-w-sm items-center gap-2 pt-3">
                        <Label htmlFor="single">
                          Please Input LAS File {`(End)`}
                        </Label>
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

                    <div className="flex flex-col md:flex-row items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            className="w-full justify-start text-left"
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
                      <MinusIcon className="h-4 w-4 opacity-50 hidden md:flex" />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            className="w-full justify-start text-left"
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
                    <div className="grid-cols-1 md:grid-cols-2 gap-2 grid">
                      <div className="w-full aspect-[16/9] border-dashed border-2 border-gray-200 rounded-lg flex items-center justify-center text-2xl font-semibold">
                        Image display here
                      </div>
                      <div className="w-full aspect-[16/9] border-dashed border-2 border-gray-200 rounded-lg flex items-center justify-center text-2xl font-semibold">
                        Image display here
                      </div>
                    </div>
                    <Button type="button" variant="outline">
                      Submit file and Calculate
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            {tab == "single" && (
              <LasUploadConfig
                listFile={historyFileUpload}
                onClickCalculateNoise={(fileList) => {
                  setHistoryFileUpload(fileList);
                }}
                file={lasFileInput.file}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </Provider>
  );
}
