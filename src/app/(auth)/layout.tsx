import { Navbar } from "./components/navbar";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
            {children}
        </div>

    </>);
}


