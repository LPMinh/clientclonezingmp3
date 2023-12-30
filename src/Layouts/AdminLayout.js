import { memo } from "react";
import MenuBarAdmin from "../components/MenuBarAdmin";
import "../styles/adminlayout.css";

function AdminLayout({children}) {
    return (  
        <div className="admin-layout">
                
                <div className="section">{children}</div>
                

        </div>
    );
}

export default  AdminLayout;