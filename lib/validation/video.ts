import { z } from "zod";

export const videoSchema = z.object({
  title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự"),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  image: z.string().min(1, "Vui lòng upload ảnh thumbnail"),
  path: z.string().min(1, "Vui lòng upload video"),
  isActive: z.boolean(),
  tags: z.array(z.string()).optional(),
});

export type VideoForm = z.infer<typeof videoSchema>; 