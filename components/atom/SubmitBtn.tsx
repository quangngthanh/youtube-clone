'use client';
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitBtn({ text }: { text: string }) {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" className="w-2/4 bg-blue-500 hover:bg-blue-600" disabled={pending}>
        {pending ? 'Đang xử lý...' : text}
      </Button>
    );
  }