"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { supabase } from '@/lib/auth/supabase-client';
import { useUserStore } from '@/lib/stores/user-store';

export function LoginButton() {
    const setUser = useUserStore((state) => state.setUser);
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
        if (error) {
            console.error("OAuth login error:", error.message);
        } else {
            const { data } = await supabase.auth.getUser();
            console.log(data);
            if (data?.user) {
                setUser({
                    email: data.user.email || '',
                    fullname: data.user.user_metadata?.full_name || '',
                    avatar: data.user.user_metadata?.avatar_url || '',
                    id: data.user.id ? Number(data.user.id) : undefined,
                });
            }
        }
    }
    return (
        <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            onClick={handleLogin}
        >
            <FcGoogle size={20} />
            Đăng nhập với Google
        </Button>
    );
} 