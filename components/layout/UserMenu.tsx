'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { PATH } from "@/lib/constants/paths";
import { useUserStore } from '@/lib/stores/user-store';
import { getFullPath } from "@/lib/utils/get-full-path";
import { supabase } from '@/lib/auth/supabase-client';
import { useRouter } from 'next/navigation';
import { getInitialsFromName } from '@/lib/utils/utils';

export function UserMenu() {
    const router = useRouter();
    const { user, clearUser } = useUserStore();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error logging out:", error);
        } else {
            // Xóa localStorage/cookies thủ công
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_info');
            // Nếu dùng Cookies lib:
            document.cookie = 'access_token=; Max-Age=0; path=/;';
            document.cookie = 'user_info=; Max-Age=0; path=/;';
            clearUser();
            router.push(PATH.HOME);
        }
    };

    if (!user) {
        return (
            <Link href={PATH.LOGIN}>
                <Avatar className="cursor-pointer">
                    <AvatarFallback>?</AvatarFallback>
                </Avatar>
            </Link>
        );
    }
    const avatarUrl = getFullPath(user.avatar || '');
    let fallback = '?';
    if (user.fullname && user.fullname.trim().length > 0) {
        fallback = getInitialsFromName(user.fullname);
    } else if (user.email) {
        fallback = user.email.substring(0, 2).toUpperCase();
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={avatarUrl} alt={user.fullname || user.email} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="px-2 py-1 text-sm font-medium text-muted-foreground">
                    {user.fullname || user.email}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer hover:text-white">
                    <Link href={PATH.ME.PROFILE}>
                        Cập nhật thông tin
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer hover:text-white">
                    <Link href={PATH.ME.VIDEO_MANAGE}>
                        Video của tôi
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer hover:text-white">
                    <Link href={PATH.ME.VIDEO_POST}>
                        Đăng video
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:text-white" onClick={handleLogout}>
                    Đăng xuất
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserMenu;