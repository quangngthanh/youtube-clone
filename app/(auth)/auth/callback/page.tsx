'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/auth/supabase-client';
import { loginWithGoogleToken } from '@/lib/auth/login-google';
import { AuthResponse, UserInfo } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { PATH } from '@/lib/constants/paths';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

export default function AuthCallback() {
    const router = useRouter();
    const handleLogin = async (data: {
        accessToken: string;
        expiredAt?: number;
        user: UserInfo;
    }) => {
        const { accessToken, expiredAt = 3600, user } = data;

        if (!accessToken || !user?.email) {
            toast.warning('❌ Thiếu accessToken hoặc user');
            return;
        }

        Cookies.set('access_token', accessToken, { expires: expiredAt / 86400 });
        Cookies.set('user_info', JSON.stringify(user), { expires: expiredAt / 86400 });

        router.push(PATH.HOME);
    };
    
    const handleOAuthRedirect = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error('OAuth callback error:', error.message);
            return;
        }

        const providerToken = data?.session?.provider_token;

        if (providerToken) {
            try {
                const res = await loginWithGoogleToken(providerToken);
                if (res) {
                    handleLogin(res as AuthResponse);
                }
            } catch (err) {
                router.push('/');
                console.error('❌ Gửi token tới NestJS thất bại:', err);
            }
        } else {
            console.warn('❗ Không tìm thấy provider_token trong session.');
        }
    };

    useEffect(() => {
        console.log('vao callback');

        handleOAuthRedirect();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-xl animate-pulse">Đang xác thực, vui lòng đợi...</p>
        </div>
    );
}