export default function DayScheduleCard(props) {
  return (
    <div className="day-schedule card">
      <div className="head">
        <img src={`/assets/${props.src}`} alt="lotus flower" />
        <h3>{props.day}</h3>
      </div>
      <hr/>
      <div className="schedule">...</div>
    </div>
  )
}
