import "./globals.css";
import type { Metadata } from "next";
import { Comfortaa,Comforter} from "next/font/google";

const comfortaa = Comfortaa({ subsets: ["cyrillic", "latin"], weight: ['400','700','600']});
    
export const metadata: Metadata = {
  title: "Главная",
  description: "Основная страница приложения",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    
  
  return (
    <html lang="ru">
      <body className={comfortaa.className}>
        <main className="  w-full h-screen  flex items-center justify-center  ">{children}</main>
      </body>
    </html>
  );
}
