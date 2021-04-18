import Image from 'next/image'

export default function DayScheduleCard({ daySchedule, src }) {
  const getSchedule = () => {
    return daySchedule.schedule.map((yogaClass, idx) => {
      return (
        <div className="class wraper" key={idx}>
          <div className="class info-wraper">
            <div className="class info">
              <p>{yogaClass.hour}</p>
              <span>{yogaClass.onlinePrice} lei</span>
            </div>

            <div>
              <p>{yogaClass.className}</p>
            </div>

          </div>

          <a className="button-white">Book</a>
        </div>
      )
    })
  }

  return (
    <div className="day-schedule card">
      <div className="head">
        <img src={`/assets/${src}`} alt="lotus flower" />
        <h3>{daySchedule.day}</h3>
        <span>{daySchedule.date}</span>
      </div>

      <hr />

      {
        daySchedule.schedule.length == 0 ?
          <div className="closed-sign"><Image src="/assets/closed.png" width={100} height={100} /></div>
          :
          <div className="schedule">
            {getSchedule()}
          </div>
      }
    </div>
  )
}
