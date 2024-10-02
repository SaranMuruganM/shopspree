"use client"
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/context/AuthContext";

export default function DashBoardLayout({ children }) {
  
  return (
    <AuthProvider>
      <div>
        <Sidebar />
        {children}
      </div>
    </AuthProvider>
  );
}
