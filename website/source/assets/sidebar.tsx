import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/sidebar.css";

// Symbol- und Pfadzuordnung:
const navItems = [
    { name: "Dashboard", icon: "home", route: "/dashboard" },
    { name: "ToDo", icon: "assignment", route: "/todo" },
    { name: "Gruppen", icon: "groups", route: "/group" }
];

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const noNavbarPaths = ["/", "/login", "/RegisterPage"];
    if (noNavbarPaths.includes(location.pathname)) {
        return null;
    }
    console.log("Sidebar: ", location.pathname);
return (
    <section
        className="page sidebar-page"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
    >
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="inner">
            <header>
                <button
                    type="button"
                    className="sidebar-burger"
                    onClick={() => setIsOpen(!isOpen)}
                    >
                    <span className="material-symbols-outlined">
                        {isOpen ? "close" : "menu"}
                    </span>
                </button>
            </header>
            <nav>
            {navItems.map((item) => (
                <button
                key={item.route}
                type="button"
                onClick={() => navigate(item.route)}
                >
                <span className="material-symbols-outlined">{item.icon}</span>
                <p>{item.name}</p>
                </button>
                ))}
                <button type="button" onClick={() => navigate("/profile")}>
                <span className="material-symbols-outlined">settings</span>
                <p>Profil</p>
            </button>
            </nav>
        </div>
        </aside>
    </section>
    );
};
