"use client";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { videoSchema, VideoForm } from '@/lib/validation/video';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TagInput } from "@/components/ui/tag-input";
import Image from "next/image";
import SubmitBtn from "@/components/atom/SubmitBtn";
import { uploadVideoAction } from "@/lib/actions/uploadVideo";
import { useFileUpload } from '@/lib/hooks/useFileUpload';
import { useVideoUpload } from '@/lib/hooks/useVideoUpload';

const defaultValues: VideoForm = {
  title: '',
  description: '',
  image: '',
  path: '',
  isActive: true,
  tags: [],
};

export default function UploadVideoClient() {
  const [serverError, setServerError] = useState<string>("");
  const { register, handleSubmit, setValue, control, formState: { errors, isSubmitting } } = useForm<VideoForm>({
    resolver: zodResolver(videoSchema),
    defaultValues,
  });

  const tags = useWatch({ control, name: 'tags' });

  const handleTagsChange = (tags: string[]) => {
    setValue('tags', tags, { shouldValidate: true });
  };

  // Upload image
  const {
    handleFileUpload: handleImageUpload,
    loading: imageUploading,
    preview: imagePreview,
    setPreview: setImagePreview
  } = useFileUpload({
    fileType: 'image',
    onSuccess: (path) => setValue('image', path, { shouldValidate: true })
  });

  // Upload video
  const {
    handleVideoUpload,
    loading: videoUploading,
    uploadId
  } = useVideoUpload({
    onSuccess: (path) => setValue('path', path, { shouldValidate: true })
  });

  const onSubmit = async (data: VideoForm) => {
    setServerError("");
    const form = document.getElementById('upload-form') as HTMLFormElement | null;
    if (!form) return;
    const formData = new FormData(form);
    const res = await uploadVideoAction(formData);
    if (res?.status === 'ERROR') {
      setServerError(res.message || 'Có lỗi xảy ra');
    }
  };

  const loading = imageUploading || videoUploading;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Đăng video mới</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="upload-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input id="title" {...register('title')} placeholder="Nhập tiêu đề video" />
              {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
            </div>
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <textarea id="description" {...register('description')} className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent transition" placeholder="Nhập mô tả video" />
              {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
            </div>
            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <TagInput name="tags" tags={tags || []} onChange={handleTagsChange} />
              {errors.tags && <p className="text-red-500 text-xs">{errors.tags.message as string}</p>}
            </div>
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="imageFile">Ảnh thumbnail</Label>
              <div className="flex gap-2 items-center">
                <Input id="imageFile" type="file" accept="image/*" onChange={handleImageUpload}  />
                {imagePreview && (
                  <div className="relative h-20 w-20">
                    <Image fill src={imagePreview} alt="Preview" className="object-cover rounded-md" />
                  </div>
                )}
              </div>
              {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
            </div>
            {/* Video Upload */}
            <div className="space-y-2">
              <Label htmlFor="videoFile">Video</Label>
              <div className="flex gap-2 items-center">
                <Input id="videoFile" type="file" accept="video/*" onChange={handleVideoUpload}  />
              </div>
              {errors.path && <p className="text-red-500 text-xs">{errors.path.message}</p>}
            </div>
            {/* Active Status */}
            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={useWatch({ control, name: 'isActive' }) === true}
                    onChange={() => setValue('isActive', true, { shouldValidate: true })}
                  />
                  <span>Public</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={useWatch({ control, name: 'isActive' }) === false}
                    onChange={() => setValue('isActive', false, { shouldValidate: true })}
                  />
                  <span>Private</span>
                </label>
              </div>
              {errors.isActive && <p className="text-red-500 text-xs">{errors.isActive.message}</p>}
            </div>
            <div className="space-y-2 text-center">
              <SubmitBtn text="Đăng video" loading={loading} />
            </div>
            {serverError && <p className="text-red-500 text-center mt-2">{serverError}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 