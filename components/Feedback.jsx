export default function Feedback({ message, iconName }) {
    return (
        <div className="feedback">
            <img src={`http://localhost/yoga/public/assets/${iconName}.svg`} />
            <p>{message}</p>
        </div>
    )
}