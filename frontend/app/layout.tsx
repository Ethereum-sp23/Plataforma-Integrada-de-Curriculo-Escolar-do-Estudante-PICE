import MetamaskProvider from "@/contexts/metamask";
import "../styles/globals.css";
import { Montserrat } from "next/font/google";

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
                <MetamaskProvider>{children}</MetamaskProvider>
            </body>
        </html>
    );
}
