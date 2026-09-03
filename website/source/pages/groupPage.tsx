import { useEffect, useState, type SubmitEvent } from "react";
import AnimatedBackground from "../assets/Animated_bg";
import { API_URL } from "../assets/backend_api";
import ComingSoon from "../assets/ComingSoon";
import { useTheme } from "../assets/ThemeContext";
import '../components/grouppage.css';

interface Group {
    groupid: number;
    groupname: string;
    groupdescription: string;
    isfamilygroup: boolean;
}

export default function GroupPage() {
    // Theme Text/Background
    const { colors, textVariants, isDarkMode} = useTheme();
    // ----------------------------------------------------
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [originalGroup, setOriginalGroup] = useState<Group | null>(null);
    const [loading, setLoading] = useState(true);
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [isFamilyGroup, setIsFamilyGroup] = useState(false);
    // Gruppeninfos bearbeiten:
    const [editingDescription, setEditingDescription] = useState(false);

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

    async function updateGroup() {
        if (!selectedGroup || !originalGroup) {
            return
        };

        const changes: Partial<Group> = {};
        
        if (selectedGroup.groupname !== originalGroup.groupname) {
            changes.groupname = selectedGroup.groupname;
        }

        if (selectedGroup.groupdescription !== originalGroup.groupdescription) {
            changes.groupdescription = selectedGroup.groupdescription;
        }

        if (selectedGroup.isfamilygroup !== originalGroup.isfamilygroup) {
            changes.isfamilygroup = selectedGroup.isfamilygroup;
        }

        if (Object.keys(changes).length === 0) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}group/group_functions.php`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        action: "updateGroup",
                        userid: userid,
                        groupid: selectedGroup.groupid,
                        changes: changes,
                    }),
                }
            );

            const data = await response.json();

        if (response.ok && data.success) {

            // Gruppenliste aktualisieren
            setGroups((prevGroups) =>
                prevGroups.map((group) =>
                    group.groupid === selectedGroup.groupid
                        ? { ...selectedGroup }
                        : group
                )
            );

            // Neuer Zustand ist jetzt der gespeicherte Zustand
            setOriginalGroup({ ...selectedGroup });

        } else {
            console.error(
                "Gruppe konnte nicht aktualisiert werden:",
                data.message
            );

            alert(
                "Gruppe konnte nicht aktualisiert werden: " +
                    (data.message || "Unbekannter Fehler")
            );
        }

    } catch (error) {
        console.error(
            "Fehler beim Aktualisieren der Gruppe:",
            error
        );

        alert("Fehler beim Aktualisieren der Gruppe.");
        }
    }
    return (
        <main className="group-page">
            <AnimatedBackground />

            <div className="group-content">

                {/* MITTE */}
                <section className="groups-list">
                    <>
                
                        <h1 style={textVariants.title}>Meine Gruppen</h1>

                        {loading ? (
                            <p style={textVariants.title}>Gruppen werden geladen...</p>
                        ) : groups.length === 0 ? (
                            <p style={textVariants.body}>
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
                            setOriginalGroup(null);
                            setEditingDescription(false);
                        } else {
                            setSelectedGroup({...group});
                            setOriginalGroup({...group});
                            setEditingDescription(false);
                        }
                    }}
                >
                    <h2 style={textVariants.title}>{group.groupname}</h2>

                    <p style={textVariants.body}>
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

                        {editingDescription ? (
    <div className="description-editor">

        <textarea
            value={selectedGroup?.groupdescription || ""}
            onChange={(e) => {
                if (!selectedGroup) return;

                setSelectedGroup({
                    ...selectedGroup,
                    groupdescription: e.target.value,
                });
            }}
            autoFocus
        />

        <button
            type="button"
            onClick={async () => {
                await updateGroup();
                setEditingDescription(false);
            }}
        >
            ✓
        </button>

    </div>
) : (
    <p style={textVariants.body}>
        {selectedGroup?.groupdescription ||
            "Keine Beschreibung vorhanden."}
    </p>
)}

                            <div className="group-actions">
                                <button onClick={()=> setEditingDescription(true)}
                                    style={textVariants.subtitle}>
                                    Beschreibung bearbeiten
                                    
                                </button>
                                {showComingSoon && (
    <ComingSoon
        title="Beschreibung"
        message="Die Beschreibungfunktion ist noch nicht fertig."
    />
)}
                                <button onClick={()=> setShowComingSoon(true)}
                                    style={textVariants.subtitle}>
                                    Mitglieder
                                </button>
                                {showComingSoon && (
    <ComingSoon
        title="Mitglieder"
        message="Die Mitgliederfunktion ist noch nicht fertig."
    />
)}
                                <button onClick={()=> setShowComingSoon(true)}
                                    style={textVariants.subtitle}>
                                    Todos
                                </button>
                                {showComingSoon && (
    <ComingSoon
        title="To-Do"
        message="Die To-Do-Funktion ist noch nicht fertig."
    />
)}
                                <button onClick={()=> setShowComingSoon(true)}
                                    style={textVariants.subtitle}>
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
                            <h2 style={textVariants.title}>Neue Gruppe</h2>

                            <button
                                onClick={() => setShowCreateGroup(true)}
                            >
                                + Gruppe erstellen
                            </button>
                        </>
                    ) : (
                        <form onSubmit={handleCreateGroup}>
                            <h2 style={textVariants.title}>Gruppe erstellen</h2>

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