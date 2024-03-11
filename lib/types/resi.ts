import * as z from "zod";

const resiSchema = z.object({
  date: z.string(),
  desc: z.string(),
  location: z.string(),
});
export const resiHistories = z.array(resiSchema);
export type resiHistories = z.infer<typeof resiHistories>;
