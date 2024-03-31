import { Roboto } from "next/font/google";
import "./globals.css";
import {AppProvider} from "./components/AppContext"
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ subsets: ["latin"], weight: ['400','500','700'] });

export const metadata = {
  title: "SmartServesa",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
          <Toaster/>
          <Header />
          {children}
          <Footer/>
          </AppProvider>
        </main>
        </body>
    </html>
  );
}
