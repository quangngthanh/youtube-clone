import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function CustomDialog({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && (
        <DialogContent aria-describedby={undefined}>
          {title && <DialogTitle>{title}</DialogTitle>}
          {children}
        </DialogContent>
      )}
    </Dialog>
  );
}