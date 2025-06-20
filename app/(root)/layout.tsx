"use client";

import MainLayout from "@/components/layout/MainLayout";
import { useAuthCleaner } from "@/lib/hooks/useAuthCleaner";
import { ThemeProvider, useTheme } from "@/lib/context/ThemeContext";

export default function RootMainLayout({ children }: { children: React.ReactNode }) {
    useAuthCleaner();
    const { isDark } = useTheme();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (const registration of registrations) {
                registration.unregister();
            }
        });
    }
    return (
        <ThemeProvider>
            <MainLayout isDark={isDark}>{children}</MainLayout>
        </ThemeProvider>
    );
}