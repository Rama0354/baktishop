"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { formReview } from "@/lib/types/review";
import { editReview } from "@/lib/utils/action/ReviewsActions";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function FormEditReview({ item, closeForm }: any) {
  const router = useRouter();
  const form = useForm({ resolver: zodResolver(formReview) });
  const isSubmitting = form.formState.isSubmitting;
  const onSubmit = async (data: any) => {
    try {
      await editReview(item.id, data).then((res: any) => {
        if (res && !res.error) {
          toast.success("berhasil diubah");
          closeForm(null);
        } else {
          toast.error(res.error.message);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("ada masalah!");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name={`review_rating`}
          defaultValue={item.review_rating}
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Nilai</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                  defaultChecked={field.value}
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
          name={`review_text`}
          defaultValue={item.review_text}
          disabled={isSubmitting}
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

        <div className="flex justify-between">
          <Button
            onClick={() => closeForm(null)}
            disabled={isSubmitting}
            size={"lg"}
            variant={"outline"}
          >
            Batal
          </Button>
          <Button disabled={isSubmitting} type="submit" size={"lg"}>
            {isSubmitting ? "Proses.." : "Simpn"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
