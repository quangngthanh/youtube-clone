import { useDialog } from "@/components/dialog/useDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function UserProfile() {
  const editDialog = useDialog();
  
  return (
    <div>
      <h1>User Profile</h1>
      <Button onClick={editDialog.open}>
        Edit Profile
      </Button>
      
      <Dialog open={editDialog.isOpen} onOpenChange={editDialog.onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <form>
            <input placeholder="Name" />
            <Button onClick={editDialog.close}>Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}