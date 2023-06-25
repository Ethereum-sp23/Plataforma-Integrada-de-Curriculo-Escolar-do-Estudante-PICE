import InstitutionNavbar from "@/components/institutionNavbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-[100vh] bg-slate-400 ">
            <InstitutionNavbar />
            {children}
        </div>
    );
}
