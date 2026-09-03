import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../assets/Animated_bg";
import { useTheme } from "../assets/ThemeContext";
import "../components/profile.css";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { isDarkMode,toggleDarkMode, colors, textVariants} = useTheme();
    const storedUser = JSON.parse(
        localStorage.getItem("user") ?? "{}"
    );

    const user = storedUser?.data?.user;

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    function logOut() {
        localStorage.removeItem("user");
        navigate("/");
    }

    function deleteUser() {
        console.log("Benutzer löschen mit ID:", user?.id);

        // Später:
        // fetch(`${API_URL}user/deleteuser.php`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         userid: user.id
        //     })
        // });
    }

    return (
        <main className="profile-page">
            <AnimatedBackground />

            <div className="profile-container">

                {!user ? (
                    <div className="profile-error">
                        <h1 style={textVariants.title}>Fehler</h1>

                        <p style={textVariants.body}>
                            Deine Benutzerdaten konnten nicht gefunden
                            werden. Bitte melde dich erneut an.
                        </p>

                        <button onClick={() => navigate("/")}
                            style={textVariants.subtitle}>
                            Zum Login
                        </button>
                    </div>
                ) : (
                    <>
                        {/* PROFIL */}
                        <section className="profile-section">
                            <h1 style={textVariants.title}>
                                Profil von {user.username}
                            </h1>

                            <div className="profile-info">
                                <p style={textVariants.body}>
                                    <strong>Benutzername:</strong>{" "}
                                    {user.username}
                                </p>

                                <p style={textVariants.body}>
                                    <strong>Vorname:</strong>{" "}
                                    {user.first_name}
                                </p>

                                <p style={textVariants.body}>
                                    <strong>E-Mail:</strong>{" "}
                                    {user.email}
                                </p>

                                <p style={textVariants.body}>
                                    <strong>Geburtsdatum:</strong>{" "}
                                    {user.birthday || "Nicht angegeben"}
                                </p>
                            </div>
                        </section>


                        {/* PROFILEINSTELLUNGEN */}
                        <section className="profile-section">
                            <h2 style={textVariants.title}>Profileinstellungen</h2>

                            <button
                            style={textVariants.subtitle}>
                                Benutzername ändern
                            </button>

                            <button
                            style={textVariants.subtitle}>
                                Vorname ändern
                            </button>

                            <button
                            style={textVariants.subtitle}>
                                Geburtsdatum ändern
                            </button>
                        </section>


                        {/* ERSCHEINUNGSBILD */}
                        <section className="profile-section">
                            <h2 style={textVariants.title}>Erscheinungsbild</h2>

                            <p style={textVariants.body}>
                                Hier kannst du später das
                                Erscheinungsbild deiner Website ändern.
                            </p>

                            <button onClick={toggleDarkMode}
                            style={textVariants.subtitle}>
                                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                            </button>
                        </section>


                        {/* FREUNDE */}
                        <section className="profile-section">
                            <h2 style={textVariants.title}>Freunde</h2>

                            <p style={textVariants.body}>
                                Füge Freunde hinzu und verwalte deine
                                Freundschaften.
                            </p>

                            <button
                            style={textVariants.subtitle}>
                                Freunde verwalten
                            </button>

                            <button
                            style={textVariants.subtitle}>
                                Freund hinzufügen
                            </button>
                        </section>


                        {/* SICHERHEIT */}
                        <section className="profile-section">
                            <h2 style={textVariants.title}>Sicherheit</h2>

                            <button
                            style={textVariants.subtitle}>
                                Passwort ändern
                            </button>
                        </section>


                        {/* GEFAHRENZONE */}
                        <section className="profile-section danger-zone">
                            <h2></h2>

                            <p style={textVariants.body}>
                                Das Löschen deines Accounts kann nicht
                                rückgängig gemacht werden.
                            </p>

                            {!showDeleteConfirm ? (
                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        setShowDeleteConfirm(true)
                                    }
                                >
                                    Profil löschen
                                </button>
                            ) : (
                                <div className="delete-confirm">
                                    <h3 style={textVariants.title}>
                                        Account wirklich löschen?
                                    </h3>

                                    <p style={textVariants.body}>
                                        Dein Account und deine
                                        zugehörigen Daten werden
                                        endgültig gelöscht.
                                    </p>

                                    <button
                                        className="delete-button"
                                        onClick={deleteUser}
                                    >
                                        Ja, endgültig löschen
                                    </button>

                                    <button
                                        onClick={() =>
                                            setShowDeleteConfirm(false)
                                        }
                                        style={textVariants.subtitle}
                                    >
                                        Abbrechen
                                    </button>
                                </div>
                            )}
                        </section>


                        {/* LOGOUT */}
                        <section className="profile-section logout-section">
                            <button onClick={logOut}
                            style={textVariants.subtitle}>
                                Ausloggen
                            </button>
                        </section>
                    </>
                )}

            </div>
        </main>
    );
}