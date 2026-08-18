import "../components/ComingSoon.css";

interface ComingSoonProps {
    title?: string;
    message?: string;
}

export default function ComingSoon({
    title = "Funktion noch nicht fertig",
    message = "An dieser Funktion wird momentan noch gearbeitet."
}: ComingSoonProps) {
    return (
        <div className="coming-soon">
            <div className="construction-icon">
                🚧
            </div>

            <h2>{title}</h2>

            <p>{message}</p>
        </div>
    );
}