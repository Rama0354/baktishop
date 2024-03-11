"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { formReviews } from "@/lib/types/review";
import { createReviews } from "@/lib/utils/action/ReviewsActions";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function FormReviews({ items }: any) {
  const router = useRouter();
  const form = useForm({ resolver: zodResolver(formReviews) });
  console.log(items);
  const onSubmit = async (data: any) => {
    await createReviews(data)
      .then((res: any) => {
        if (!res.error) {
          if (res.status === 200) {
            toast.success(res.message);
            router.push("/users");
          } else {
            toast.error(res.message);
          }
        } else {
          console.log(res.error);
          toast.error(res.error.message);
        }
      })
      .catch((err: any) => {
        console.log("ada masalah!", err);
        toast.error("ada masalah");
      });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <Card className="w-full">
          <CardHeader className="border-b py-3">
            <CardTitle>Produk</CardTitle>
          </CardHeader>
          <CardContent className="py-3">
            <ul>
              {items.map((item: any, idx: number) => (
                <li key={idx} className="flex flex-col gap-3 py-2">
                  <div className="flex">
                    <div className="w-24">
                      <Image
                        src={`/assets/img/no-image.jpg`}
                        width={96}
                        height={96}
                        alt="item"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <h2 className="font-bold text-primary">
                        {item.item_gifts.item_gift_name}{" "}
                        <span className="text-sm font-normal text-secondary dark:text-white">
                          x{item.redeem_quantity}
                        </span>
                      </h2>
                      <p className="text-sm">
                        {item.item_gifts.item_gift_weight *
                          item.redeem_quantity}{" "}
                        Gram
                      </p>
                      <p className="text-amber-600">{item.fredeem_point}</p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name={`redeem_id[${idx}]`}
                    defaultValue={item.redeem_id}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="hidden"
                            readOnly
                            className="resize-none bg-secondary/25"
                            {...field}
                            onChange={() =>
                              form.setValue(`redeem_id[${idx}]`, item.redeem_id)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`item_gift_id[${idx}]`}
                    defaultValue={item.item_gifts.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="hidden"
                            readOnly
                            className="resize-none bg-secondary/25"
                            {...field}
                            onChange={() =>
                              form.setValue(
                                `item_gift_id[${idx}]`,
                                item.item_gifts.id
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`review_rating[${idx}]`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Nilai</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) =>
                              field.onChange(parseInt(value))
                            }
                            defaultValue={field.value}
                            className="flex space-x-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="1" />
                              </FormControl>
                              <FormLabel className="font-normal">1</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="2" />
                              </FormControl>
                              <FormLabel className="font-normal">2</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="3" />
                              </FormControl>
                              <FormLabel className="font-normal">3</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="4" />
                              </FormControl>
                              <FormLabel className="font-normal">4</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="5" />
                              </FormControl>
                              <FormLabel className="font-normal">5</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`review_text[${idx}]`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ulasan</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Bagaimana pendapatmu tentang produk ini?"
                            className="resize-none bg-secondary/25"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </li>
              ))}
              {/* <li className="flex gap-3 py-2">
                <div className="w-24">
                  <Image
                    src={`/assets/img/no-image.jpg`}
                    width={96}
                    height={96}
                    alt="item"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="font-bold text-primary">
                    Product Title{" "}
                    <span className="text-sm font-normal text-secondary dark:text-white">
                      x1
                    </span>
                  </h2>
                  <p className="text-sm">120 Gram</p>
                  <p className="text-amber-600">Rp 50.000</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-24">
                  <Image
                    src={`/assets/img/no-image.jpg`}
                    width={96}
                    height={96}
                    alt="item"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="font-bold text-primary">
                    Product Title <Badge variant={"secondary"}>Variant</Badge>{" "}
                    <span className="text-sm font-normal text-black dark:text-white">
                      x1
                    </span>
                  </h2>
                  <p className="text-sm">120 Gram</p>
                  <p className="text-amber-600">Rp 50.000</p>
                </div>
              </li> */}
            </ul>
          </CardContent>
          <CardFooter>
            <Button type="submit" size={"lg"}>
              Kirim
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
