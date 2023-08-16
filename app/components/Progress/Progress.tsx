import "./Progress.css";
export default function Progreess({ percentage }: { percentage: number }) {
    return (
        <div className="progress-container">
            {percentage == 0 ? (
                <div className="progress" style={{ width: "100%" }}>
                    {" "}
                    No progress{" "}
                </div>
            ) : (
                <div
                    style={{ width: `${percentage.toFixed(2)}%` }}
                    className="progress green-progress"
                >
                    {percentage.toFixed(2)}%
                </div>
            )}
        </div>
    );
}
