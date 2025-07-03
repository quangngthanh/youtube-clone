import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useItemDialog } from "@/components/dialog/useItemDialog";
import EditForm, { User } from "./EditForm";
import { CustomDialog } from "@/components/common/CustomDialog";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

export default function UserList({ users }: { users: User[] }) {
    const editDialog = useItemDialog<User>();
    const deleteDialog = useItemDialog<User>();
   
    return (
      <div>
        {users.map(user => (
          <div key={user.id}>
            <span>{user.name}</span>
            <Button onClick={() => editDialog.openWith(user)}>
              Edit
            </Button>
            <Button onClick={() => deleteDialog.openWith(user)}>
              Delete
            </Button>
          </div>
        ))}
        
        <CustomDialog 
        open={editDialog.isOpen} 
        onOpenChange={editDialog.onOpenChange}
        title="Edit User"
        >
          {editDialog.selectedItem && <EditForm user={editDialog.selectedItem} onSave={editDialog.close} />}
        </CustomDialog>
        
        <ConfirmDialog
          open={deleteDialog.isOpen}
          onOpenChange={deleteDialog.onOpenChange}
          message="Bạn có chắc chắn muốn xóa người dùng này không?"
          onConfirm={() => deleteDialog.close()}
          onCancel={deleteDialog.close}
        />
      </div>
    );
  }