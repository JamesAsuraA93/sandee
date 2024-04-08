import React from "react";

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

const formSchema = z.object({
  chooseNoise: z.enum(["add", "remove"]),
  noise: z.string().refine((val) => {
    const num = Number(val);
    return num >= 0 && num <= 100;
  }),
});

type Props = {
  data: {
    main: number;
    volume: number;
  };
};

export default function LasUploadConfig(props: Props) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: "",
    // },
    values: {
      chooseNoise: "add",
      noise: "10",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                  เลือกการปรับค่า Noise ที่ต้องการ{" "}
                  {field.value === "add" ? '"เพิ่ม"' : '"ลด"'}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={"add"} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Noise level above
                      </FormLabel>
                    </FormItem>

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
                  {form.watch("chooseNoise") === "add" ? "above" : "below"}{" "}
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
          <h1 className="text-lg font-bold">ปริมตรของ Input Point Cloud</h1>
          <p>{props.data.volume.toLocaleString()} cm^3</p>
        </Label>

        <Label>
          <h1 className="text-lg font-bold">Noise Level</h1>
          <p>{form.getValues("noise")}%</p>
        </Label>

        <Label>
          Before {form.watch("chooseNoise") === "add" ? "Add" : "Remove"} Noise
          : <p>{props.data.main}</p>
        </Label>

        <Label>
          After {form.watch("chooseNoise") === "add" ? "Add" : "Remove"} Noise :
          <p>{props.data.main * (1 + Number(form.watch("noise")) / 100)}</p>
        </Label>
      </div>
    </Card>
  );
}
