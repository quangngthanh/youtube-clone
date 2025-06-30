import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginButton } from "@/app/(auth)/login/LoginButton";
import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";

export default async function LoginPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;


    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-12">
            <Card className="w-full max-w-md rounded-2xl shadow-xl border border-border bg-card text-card-foreground">
                <CardHeader>
                    <CardTitle className="text-2xl text-center font-bold text-accent">
                        Đăng nhập
                    </CardTitle>
                </CardHeader>
                <form>
                    <CardContent className="space-y-4">
                        <LoginButton />
                        <Link href={process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}>
                            <Button variant="outline" className="w-full gap-2 bg-[#000] text-white">
                                Trang Chủ
                            </Button>
                        </Link>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}