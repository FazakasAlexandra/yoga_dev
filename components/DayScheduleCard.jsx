import Image from 'next/image'
import { useEffect, useState } from 'react';
import ClassDialog from './ClassDialog';
import DayScheduleClass from './DayScheduleClass';
import { useSession } from 'next-auth/client'
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
    console.log(yogaClass)
  }

  const handleBookClick = (yogaClass) => {
     db.bookings.postBooking(userData.jwt, yogaClass.schedulesWeeksId).then(() => {
      console.log('booked !')
      updateUserData()
    })
  }

  const getSchedule = () => {
    return dayData.schedule.map((yogaClass, idx) => {
      yogaClass.id = idx
      yogaClass.classType = yogaClass.classType || 'online'
      console.log(userBookings[yogaClass.schedulesWeeksId] || false)
      return (
        <DayScheduleClass
          userData={userData}
          key={idx}
          dayScheduleClass={yogaClass}
          isBooked={userBookings[yogaClass.schedulesWeeksId] || false}
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
          title={yogaClass.className}
          content={
            <>
              <p><b>Class level</b></p>
              <p>{yogaClass.classLevel}</p>
              <p><b>Description</b></p>
              <p>{yogaClass.classDescription}</p>
            </>
          }
          closeDialog={handleDialogClose}
        />
        : null}
    </div>
  )
}
