"use server";
import { API_ENDPOINTS } from "@/lib/api/end-points";
import { getFullPath } from "@/lib/utils/get-full-path";

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("imageFile");
  if (!file || !(file instanceof File)) {
    return { status: "ERROR", message: "Không tìm thấy file ảnh" };
  }
  const uploadForm = new FormData();
  uploadForm.append("file", file);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.common.uploadImage}`,
      {
        method: "POST",
        body: uploadForm,
        credentials: "include",
      }
    );
    if (!res.ok) {
      return { status: "ERROR", message: "Lỗi upload ảnh" };
    }
    const data = await res.json();
    return { status: "SUCCESS", path: getFullPath(data.path) };
  } catch (e) {
    return { status: "ERROR", message: "Lỗi upload ảnh" };
  }
}
