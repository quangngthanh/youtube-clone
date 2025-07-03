import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

    export function ConfirmDialog({
    open,
    onOpenChange,
    message,
    onConfirm,
    onCancel,
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Xác nhận</DialogTitle>
          <p>{message}</p>
          <Button onClick={onCancel}>Hủy</Button>
          <Button onClick={onConfirm}>Đồng ý</Button>
        </DialogContent>
      </Dialog>
    );
  }