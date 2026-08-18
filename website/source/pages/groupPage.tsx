import { useEffect, useState, type SubmitEvent } from "react";
import AnimatedBackground from "../assets/Animated_bg";
import { API_URL } from "../assets/backend_api";
import ComingSoon from "../assets/ComingSoon";
import '../components/grouppage.css';

interface Group {
    groupid: number;
    groupname: string;
    groupdescription: string;
    isfamilygroup: boolean;
}

export default function GroupPage() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const [loading, setLoading] = useState(true);

    const [showCreateGroup, setShowCreateGroup] = useState(false);

    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [isFamilyGroup, setIsFamilyGroup] = useState(false);

    // temporär
    const [showComingSoon, setShowComingSoon] = useState(false);
    // Benutzer aus localStorage holen
    const storedUser = localStorage.getItem("user");

    // Hier ggf. an deine tatsächliche Login-Struktur anpassen
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userid = user?.data?.user?.id;

    useEffect(() => {
        if (!userid) {
            setLoading(false);
            return;
        }

        getGroups();
    }, [userid]);

    async function getGroups() {
        try {
            const response = await fetch(`${API_URL}group/group_functions.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: 'getGroups',
                    userid: userid,
                }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setGroups(data.groups);
            } else {
                console.error("Gruppen konnten nicht geladen werden:", data.message);
            }
        } catch (error) {
            console.error("Fehler beim Laden der Gruppen:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateGroup(e: SubmitEvent) {
        e.preventDefault();

        if (!groupName.trim()) {
            alert("Bitte einen Gruppennamen eingeben.");
            return;
        }
        try {
            const response = await fetch(`${API_URL}group/group_functions.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "createGroup",
                    userid: userid,
                    isFamilyGroup: isFamilyGroup ,
                    groupName: groupName,
                    groupdescription: groupDescription,
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert("Gruppe wurde erstellt!");

                setGroupName("");
                setGroupDescription("");
                setIsFamilyGroup(false);
                setShowCreateGroup(false);

                // Liste neu laden
                getGroups();
            } else {
                alert(
                    "Gruppe konnte nicht erstellt werden: " +
                    (data.message || "Unbekannter Fehler")
                );
            }
        } catch (error) {
            console.error(error);
            alert("Fehler beim Erstellen der Gruppe.");
        }
    }

    return (
        <main className="group-page">
            <AnimatedBackground />

            <div className="group-content">

                {/* MITTE */}
                <section className="groups-list">
                    <>
                
                        <h1>Meine Gruppen</h1>

                        {loading ? (
                            <p>Gruppen werden geladen...</p>
                        ) : groups.length === 0 ? (
                            <p>
                                Du bist momentan in keiner Gruppe.
                            </p>
                        ) : (
                            <div className="groups">
                                {groups.map((group) => {
                                    console.log(group);
                                const isSelected = selectedGroup?.groupid === group.groupid;

                                return (
                                <div
                                className={`group-wrapper ${isSelected ? "selected" : ""}`}
                                key={group.groupid}
                                    >
                                <div
                                    className="group-card"
                                    onClick={() => {
                        if (isSelected) {
                            setSelectedGroup(null);
                        } else {
                            setSelectedGroup(group);
                        }
                    }}
                >
                    <h2>{group.groupname}</h2>

                    <p>
                        {group.groupdescription ||
                            "Keine Beschreibung vorhanden."}
                    </p>

                    {group.isfamilygroup && (
                        <span>Familiengruppe</span>
                    )}
                </div>

                {isSelected && (
                    <div className="group-detail">
                        <div className="group-detail-content">

                            <p>
                                {group.groupdescription ||
                                    "Keine Beschreibung vorhanden."}
                            </p>

                            <div className="group-actions">
                                <button onClick={()=> setShowComingSoon(true)}>
                                    Beschreibung bearbeiten
                                    
                                </button>
                                {showComingSoon && (
    <ComingSoon
        title="Beschreibung"
        message="Die Beschreibungfunktion ist noch nicht fertig."
    />
)}
                                <button onClick={()=> setShowComingSoon(true)}>
                                    Mitglieder
                                </button>
                                {showComingSoon && (
    <ComingSoon
        title="Mitglieder"
        message="Die Mitgliederfunktion ist noch nicht fertig."
    />
)}
                                <button onClick={()=> setShowComingSoon(true)}>
                                    Todos
                                </button>
                                {showComingSoon && (
    <ComingSoon
        title="To-Do"
        message="Die To-Do-Funktion ist noch nicht fertig."
    />
)}
                                <button onClick={()=> setShowComingSoon(true)}>
                                    Kalender
                                </button>

                                {showComingSoon && (
    <ComingSoon
        title="Kalender"
        message="Die Kalenderfunktion ist noch nicht fertig."
    />
)}
                            </div>

                        </div>
                    </div>
                )}
            </div>
        );
    })}
</div>
                        )}
                    </>
                    
                </section>

                {/* RECHTS */}
                <section className="create-group">

                    {!showCreateGroup ? (
                        <>
                            <h2>Neue Gruppe</h2>

                            <button
                                onClick={() => setShowCreateGroup(true)}
                            >
                                + Gruppe erstellen
                            </button>
                        </>
                    ) : (
                        <form onSubmit={handleCreateGroup}>
                            <h2>Gruppe erstellen</h2>

                            <input
                                type="text"
                                placeholder="Gruppenname *"
                                value={groupName}
                                onChange={(e) =>
                                    setGroupName(e.target.value)
                                }
                            />

                            <textarea
                                placeholder="Beschreibung"
                                value={groupDescription}
                                onChange={(e) =>
                                    setGroupDescription(e.target.value)
                                }
                            />

                            <label>
                                <input
                                    type="checkbox"
                                    checked={isFamilyGroup}
                                    onChange={(e) =>
                                        setIsFamilyGroup(e.target.checked)
                                    }
                                />

                                Familiengruppe?
                            </label>

                            <button type="submit">
                                Gruppe erstellen
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowCreateGroup(false)
                                }
                            >
                                Abbrechen
                            </button>
                        </form>
                    )}

                </section>
            </div>
        </main>
    );
}