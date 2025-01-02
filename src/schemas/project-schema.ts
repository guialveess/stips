import * as z from "zod";

export const projectSchema = [
  z.object({
    name: z.string().min(1, { message: "Please enter a project name." }),
    domain: z.string().min(1, { message: "Please enter a project domain." }),
  }),
  z.object({
    socialLinks: z
      .array(
        z.object({
          name: z.string().optional(),
          url: z.string().url({ message: "Please enter a valid URL." }),
        })
      )
      .optional(),
  }),
];

export type ProjectFormValues = z.infer<(typeof projectSchema)[number]>;
