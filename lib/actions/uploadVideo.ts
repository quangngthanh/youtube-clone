"use server";
import { API_ENDPOINTS } from "@/lib/api/end-points";
import { getFullPath } from "@/lib/utils/get-full-path";

const CHUNK_SIZE = 1024 * 1024 * 10; // 10MB

export async function uploadVideoAction(formData: FormData) {
  const file = formData.get("videoFile");
  if (!file || !(file instanceof File)) {
    return { status: "ERROR", message: "Không tìm thấy file video" };
  }
  if (file.size <= CHUNK_SIZE) {
    // Upload trực tiếp nếu nhỏ hơn 10MB
    const uploadForm = new FormData();
    uploadForm.append("file", file);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.common.uploadVideo}`,
        {
          method: "POST",
          body: uploadForm,
          credentials: "include",
        }
      );
      if (!res.ok) {
        return { status: "ERROR", message: "Lỗi upload video" };
      }
      const data = await res.json();
      return { status: "SUCCESS", path: getFullPath(data.path) };
    } catch (e) {
      return { status: "ERROR", message: "Lỗi upload video" };
    }
  }
  // Chunk upload nếu lớn hơn 10MB
  try {
    // 1. Init upload
    const initRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.common.initVideoUpload}`,
      {
        method: "POST",
        body: JSON.stringify({ filename: file.name, totalSize: file.size }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (!initRes.ok) {
      return { status: "ERROR", message: "Lỗi khởi tạo upload video" };
    }
    const { uploadId } = await initRes.json();
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);
      const chunkForm = new FormData();
      chunkForm.append("chunk", chunk);
      chunkForm.append("uploadId", uploadId);
      chunkForm.append("chunkIndex", chunkIndex.toString());
      const chunkRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.common.uploadVideoChunk}`,
        {
          method: "POST",
          body: chunkForm,
          credentials: "include",
        }
      );
      if (!chunkRes.ok) {
        return { status: "ERROR", message: `Lỗi upload chunk ${chunkIndex + 1}` };
      }
    }
    // 3. Complete upload
    const completeRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.common.completeVideoUpload}`,
      {
        method: "POST",
        body: JSON.stringify({ uploadId }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (!completeRes.ok) {
      return { status: "ERROR", message: "Lỗi hoàn tất upload video" };
    }
    const data = await completeRes.json();
    return { status: "SUCCESS", path: getFullPath(data.path) };
  } catch (e) {
    return { status: "ERROR", message: "Lỗi upload video" };
  }
}
