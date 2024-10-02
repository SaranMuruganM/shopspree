
import Navbar from "@/components/Navbar";

import "./globals.css";


export const metadata = {
  title: "ShopSpree",
  description: "A listing app",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en" className="max-h-[100vh] overflow-hidden">
      <body>
        <Navbar/>
    
        <div className="mt-[80px] p-8 ml-[200px]">
        {children}
          </div>
      </body>
    </html>
  );
}
