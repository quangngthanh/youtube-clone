"use client";
import { useState } from "react";
import UserMenu from "@/components/layout/UserMenu";
import { FaSearch } from "react-icons/fa";
import { Menu, Sun, Moon } from "lucide-react";
import { PATH } from "@/lib/constants/paths";
import Link from "next/link";
import { useTheme } from "@/lib/context/ThemeContext";
import { useVideoSearch } from "@/lib/hooks/useVideoSearch";
import YouTube from '@/lib/svg/Youtube';

export function Header({ toggleSidebar }: { toggleSidebar?: () => void }) {
    const { isDark, toggleTheme } = useTheme();
    const { searchVideos, loading } = useVideoSearch();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        searchVideos(searchQuery);
    };

    return (
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
            <button
                className="md:hidden text-gray-800"
                onClick={toggleSidebar}
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* mobile */}
            <div className="flex items-center gap-2 mx-auto md:mx-0 text-primary dark:text-white lg:hidden">
                <Link href={PATH.HOME} className="flex items-center gap-2">
                    <YouTube className="text-red-600 w-8 h-8" />
                    <span className="text-lg font-semibold text-black">YouTube</span>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="hidden md:flex w-full max-w-xl mx-6">
                <div className="flex flex-1 border border-input bg-background rounded-full overflow-hidden dark:border-primary-foreground">
                    <input
                        type="text"
                        placeholder="Tìm kiếm video..."
                        className="flex-1 px-4 py-2 bg-transparent text-sm outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white px-4 flex items-center justify-center"
                        disabled={loading}
                    >
                        <FaSearch className="text-white text-sm" />
                    </button>
                </div>
            </form>

            <div className="flex items-center gap-2 md:ml-0">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-muted transition"
                    aria-label="Toggle dark mode"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <UserMenu />
            </div>
        </header>
    );
}
