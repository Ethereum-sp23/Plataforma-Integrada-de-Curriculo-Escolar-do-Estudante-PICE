import AuthProvider from "@/contexts/auth";
import "../styles/globals.css";
import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
    title: "PICE",
    description: "Plataforma integrada de currículo escolar do estudante",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className="scroll-smooth">
            <body className={montserrat.className}>
                <AuthProvider>
                    {children}
                    <ToastContainer />
                </AuthProvider>
            </body>
        </html>
    );
}
