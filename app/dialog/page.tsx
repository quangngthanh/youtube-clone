'use client'
import UserList from "./UserList";
import { User } from "./EditForm";

export default function DialogPage() {
  const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ];

  return (
    <div>
      <UserList users={users} />
    </div>
  );
}