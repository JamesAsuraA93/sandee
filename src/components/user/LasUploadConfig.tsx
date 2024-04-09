import React, { useEffect } from "react";

// type Props = {}

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "sonner";

const formSchema = z.object({
  chooseNoise: z.enum(["remove"]),
  noise: z.string().refine(
    (val) => {
      const num = Number(val);
      return num >= 0 && num <= 100;
    },
    {
      message: "Noise level must be between 0-100",
    }
  ),
});

type Props = {
  file: File | null;
  // data: {
  //   main: number;
  //   volume: number;
  // };
  listFile: {
    oldFile: File | null;
    computedFile: File | null;
  }[];
  onClickCalculateNoise: (
    fileList: {
      oldFile: File | null;
      computedFile: File | null;
    }[]
  ) => void;
};

export default function LasUploadConfig(props: Props) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: "",
    // },
    values: {
      chooseNoise: "remove",
      noise: "10",
    },
  });

  const [noiseData, setNoiseData] = React.useState({
    before_noise_points: (props.file?.size || 0) * 3 * 25 * 0.63,
    after_noise_points: 0,
  });

  useEffect(() => {
    setNoiseData({
      before_noise_points: (props.file?.size || 0) * 3 * 25 * 0.63,
      after_noise_points: 0,
    });
  }, [props.file]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    if (props.file === null) {
      toast.error("Please upload a file first");
      return;
    }

    // console.log(values);

    if (values.chooseNoise === "remove") {
      setNoiseData({
        ...noiseData,
        after_noise_points:
          noiseData.before_noise_points * (1 - Number(values.noise) / 100),
      });

      toast.success("Calculate Noise Success");
      // type tempNewListFileType = File | null;
      // const tempNewListFile: tempNewListFileType[] = [
      //   ...props.listFile.map((file) => file.oldFile),
      // ];
      // tempNewListFileType [] tempNewListFile = [
      //   ...props.listFile.map((file) => file.computedFile),
      // ];

      // const tempNewListFile:{
      //   oldFile: File | null;
      //   computedFile: File | null;
      // }[] = props.listFile.map((file) => {
      //     return {
      //       oldFile: file.oldFile,
      //       computedFile: file.computedFile,
      //     };
      //     // file.oldFile
      //   }),

      const tempNewListFile = props.listFile.map((file) => {
        // const reduce_mem_files = (file: File) => {
        //   const reader = new FileReader();
        //   reader.onload = (e) => {
        //     const content = e.target?.result;
        //     const lines = content?.toString().split("\n");
        //     const new_lines = lines?.map((line) => {
        //       const words = line.split(" ");
        //       if (words.length > 3) {
        //         return words.slice(0, 3).join(" ");
        //       }
        //       return line;
        //     });
        //     const new_content: any = new_lines?.join("\n");
        //     const new_file = new File([new_content], file.name, {
        //       type: file.type,
        //     });
        //     return new_file;
        //   };
        //   reader.readAsText(file);

        //   return file;
        // };
        // rename file
        const rename_files = (file: File | null) => {
          if (file === null) {
            return null;
          }
          const new_file = new File([file], "computed_" + file.name, {
            type: file.type,
          });
          return new_file;
        };

        console.log(file.oldFile);

        const reduce_size_files = (file: File | null) => {
          if (file === null) {
            return null;
          }
          const percent_reduce = Number(values.noise) / 100;
          console.log(percent_reduce);
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result;
            const lines = content?.toString().split("\n");
            const new_lines = lines?.map((line) => {
              const words = line.split(" ");
              if (words.length > 3) {
                return words
                  .map((word, index) => {
                    if (index === 3) {
                      return String(
                        Number(word) * (1 - percent_reduce)
                      ).toString();
                    }
                    return word;
                  })
                  .join(" ");
              }
              return line;
            });
            const new_content: any = new_lines?.join("\n");
            const new_file = new File([new_content], file.name, {
              type: file.type,
            });
            return new_file;
          };
          // const reader = new FileReader();
          // reader.onload = (e) => {
          //   const content = e.target?.result;
          //   const lines = content?.toString().split("\n");
          //   const new_lines = lines?.map((line) => {
          //     const words = line.split(" ");
          //     if (words.length > 3) {
          //       return words.slice(0, 3).join(" ");
          //     }
          //     return line;
          //   });
          //   const new_content: any = new_lines?.join("\n");
          //   const new_file = new File([new_content], file.name, {
          //     type: file.type,
          //   });
          //   return new_file;
          // };
          // reader.readAsText(file);

          return file;
        };

        // console.log(file.computedFile?.size);

        const new_rename = rename_files(file.oldFile);
        const new_reduce_size_computed = reduce_size_files(new_rename);
        return {
          oldFile: file.oldFile,
          computedFile: new_reduce_size_computed,
        };
      });

      // console.log(tempNewListFile);

      props.onClickCalculateNoise(tempNewListFile);
    }

    // console.log(values);
  }

  return (
    <Card className="flex flex-col p-6 w-full items-center gap-4">
      <Label>
        <h1 className="text-2xl font-bold">Upload Config</h1>
      </Label>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-full"
        >
          <FormField
            control={form.control}
            name="chooseNoise"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  เลือกการปรับค่าการลด Noise ที่ต้องการ
                  {/* {field.value === "add" ? '"เพิ่ม"' : '"ลด"'} */}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {/* <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={"add"} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Noise level above
                      </FormLabel>
                    </FormItem> */}

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="remove" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Noise level below
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Noise Level{" "}
                  {/* {form.watch("chooseNoise") === "add" ? "above" : "below"}{" "} */}
                  (0-100)%
                </FormLabel>
                <FormControl className="md:max-w-[50%]">
                  <Input placeholder="0-100" {...field} />
                </FormControl>
                <FormDescription>
                  แนะนำให้ใช้ค่า Noise ที่ต่ำที่สุดเพื่อให้ได้ผลลัพธ์ที่ดีที่สุด{" "}
                  {`< 10%`}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <Separator />

      <Label>
        <h1 className="text-2xl font-bold">Data Result</h1>
      </Label>

      <div className="flex flex-col gap-4 w-full">
        <Label>
          <h1>ขนาดไฟล์</h1>
          <p>{props.file?.size || 0} bytes</p>
        </Label>

        <h1 className="text-lg font-bold">ปริมตรของ Input Point Cloud</h1>

        <Label>
          <h1 className="text-lg font-bold">Noise Level</h1>
          <p>{form.getValues("noise")}%</p>
        </Label>

        <Label>
          Before {"Remove"} Noise : <p>{noiseData.before_noise_points} cm^3</p>
        </Label>

        <Label>
          After {"Remove"} Noise : <p>{noiseData.after_noise_points} cm^3</p>
        </Label>
      </div>
    </Card>
  );
}
