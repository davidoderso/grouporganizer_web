import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../assets/Animated_bg";
import "../components/profile.css";

export default function ProfilePage() {
    const navigate = useNavigate();

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
                        <h1>Fehler</h1>

                        <p>
                            Deine Benutzerdaten konnten nicht gefunden
                            werden. Bitte melde dich erneut an.
                        </p>

                        <button onClick={() => navigate("/")}>
                            Zum Login
                        </button>
                    </div>
                ) : (
                    <>
                        {/* PROFIL */}
                        <section className="profile-section">
                            <h1>
                                Profil von {user.username}
                            </h1>

                            <div className="profile-info">
                                <p>
                                    <strong>Benutzername:</strong>{" "}
                                    {user.username}
                                </p>

                                <p>
                                    <strong>Vorname:</strong>{" "}
                                    {user.first_name}
                                </p>

                                <p>
                                    <strong>E-Mail:</strong>{" "}
                                    {user.email}
                                </p>

                                <p>
                                    <strong>Geburtsdatum:</strong>{" "}
                                    {user.birthday || "Nicht angegeben"}
                                </p>
                            </div>
                        </section>


                        {/* PROFILEINSTELLUNGEN */}
                        <section className="profile-section">
                            <h2>Profileinstellungen</h2>

                            <button>
                                Benutzername ändern
                            </button>

                            <button>
                                Vorname ändern
                            </button>

                            <button>
                                Geburtsdatum ändern
                            </button>
                        </section>


                        {/* ERSCHEINUNGSBILD */}
                        <section className="profile-section">
                            <h2>Erscheinungsbild</h2>

                            <p>
                                Hier kannst du später das
                                Erscheinungsbild deiner Website ändern.
                            </p>

                            <button>
                                Darkmode / Whitemode
                            </button>
                        </section>


                        {/* FREUNDE */}
                        <section className="profile-section">
                            <h2>Freunde</h2>

                            <p>
                                Füge Freunde hinzu und verwalte deine
                                Freundschaften.
                            </p>

                            <button>
                                Freunde verwalten
                            </button>

                            <button>
                                Freund hinzufügen
                            </button>
                        </section>


                        {/* SICHERHEIT */}
                        <section className="profile-section">
                            <h2>Sicherheit</h2>

                            <button>
                                Passwort ändern
                            </button>
                        </section>


                        {/* GEFAHRENZONE */}
                        <section className="profile-section danger-zone">
                            <h2></h2>

                            <p>
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
                                    <h3>
                                        Account wirklich löschen?
                                    </h3>

                                    <p>
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
                                    >
                                        Abbrechen
                                    </button>
                                </div>
                            )}
                        </section>


                        {/* LOGOUT */}
                        <section className="profile-section logout-section">
                            <button onClick={logOut}>
                                Ausloggen
                            </button>
                        </section>
                    </>
                )}

            </div>
        </main>
    );
}