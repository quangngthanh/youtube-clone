export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>; // không render header, sidebar
}