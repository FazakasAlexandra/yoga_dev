import Image from 'next/image'
import { useState } from 'react';
import ClassDialog from './ClassDialog';
import DayScheduleClass from './DayScheduleClass';
import db from '../db.js'

export default function DayScheduleCard({ dayData, userData, updateUserData, userBookings }) {
  const [open, setOpen] = useState(false);
  const [yogaClass, setYogaClass] = useState(null);
  
  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleInfoIconClick = (yogaClass) => {
    setOpen(true);
    setYogaClass(yogaClass)
  }

  const handleBookClick = (yogaClass) => {
      db.bookings.postBooking(userData.jwt, yogaClass.schedules_weeks_id, yogaClass.classType).then(() => {
      console.log('booked !')
      updateUserData()
    }) 
  }

  const getSchedule = () => {
    return dayData.schedule.map((yogaClass, idx) => {
      yogaClass.id = idx
      yogaClass.classType = yogaClass.classType || 'online'
      return (
        <DayScheduleClass
          userData={userData}
          key={idx}
          dayScheduleClass={yogaClass}
          isBooked={userBookings[yogaClass.schedules_weeks_id] || false}
          handleInfoIconClick={handleInfoIconClick}
          handleBookClick={handleBookClick}
        />
      )
    })
  }

  return (
    <div className="day-schedule card">
      <div className="head">
        <img src={`/assets/lotus.svg`} alt="lotus flower" />
        <h3>{dayData.day}</h3>
        <span>{dayData.date}</span>
      </div>

      <hr />

      {
        dayData.schedule.length == 0 ?
          <div className="closed-sign"><Image src="/assets/closed.png" width={100} height={100} /></div>
          :
          <div className="schedule">
            {getSchedule()}
          </div>
      }
      {open ?
        <ClassDialog
          isOpen={open}
          yogaClass={yogaClass}
          closeDialog={handleDialogClose}
        />
        : null}
    </div>
  )
}
