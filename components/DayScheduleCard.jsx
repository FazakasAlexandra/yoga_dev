import Image from 'next/image'
import { useState } from 'react'
import ClassDialog from './ClassDialog'
import ClassZoomLinkDialog from './ClassZoomLinkDialog'
import DayScheduleClass from './DayScheduleClass'
import { formatDate } from '../utilities.js'
import db from '../db.js'
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function DayScheduleCard({
  dayData,
  userData,
  updateUserData,
  userBookings,
}) {
  const [open, setOpen] = useState(false)
  const [zoomLinkOpen, setZoomLinkOpen] = useState(false)
  const [selectedYogaClass, setSelectedYogaClass] = useState({})
  const [daySchedule, setDayClasses] = useState(dayData.schedule)
  const notify = () => toast(`Added link for ${selectedYogaClass.name} !`)

  const updateSelectedClassLink = (link) => {
    selectedYogaClass.link = link
    const newDayClasses = daySchedule.map((yogaClass) => {
      if (yogaClass.id === selectedYogaClass.id) yogaClass.link = link
      return yogaClass
    })
    notify()
    setDayClasses(newDayClasses)
  }

  const handleDialogClose = () => {
    setOpen(false)
  }

  const handleZoomDialogClose = () => {
    setZoomLinkOpen(false)
  }

  const handleInfoIconClick = (selectedYogaClass) => {
    setOpen(true)
    setSelectedYogaClass(selectedYogaClass)
  }

  const handleZoomLinkClick = (selectedYogaClass) => {
    setZoomLinkOpen(true)
    setSelectedYogaClass(selectedYogaClass)
  }

  const handleBookClick = (yogaClass) => {
    console.log(userData.jwt)
    db.bookings
      .postBooking(
        userData.jwt,
        yogaClass.schedules_weeks_id,
        yogaClass.classType
      )
      .then(() => {
        updateUserData()
      })
  }

  const getSchedule = () => {
    return daySchedule.map((yogaClass, idx) => {
      yogaClass.id = _.uniqueId('class_')
      yogaClass.classType = yogaClass.classType || 'online'
      return (
        <DayScheduleClass
          userData={userData}
          key={idx}
          dayScheduleClass={yogaClass}
          isBooked={userBookings[yogaClass.schedules_weeks_id] || false}
          handleInfoIconClick={handleInfoIconClick}
          handleZoomLinkClick={handleZoomLinkClick}
          handleBookClick={handleBookClick}
        />
      )
    })
  }

  const getDate = (date) => {
    return (
      <span className='date'>
        <span>{date.day} </span>
        <span>{date.month}</span>
      </span>
    )
  }

  return (
    <div className='day-schedule card'>
      <div className='head'>
        <img src={`/assets/lotus.svg`} alt='lotus flower' />
        <h3>{dayData.day}</h3>
        {getDate(formatDate(dayData.date))}
      </div>

      {daySchedule.length == 0 ? (
        <div className='closed-sign'>
          <Image src='/assets/closed.png' width={100} height={100} />
        </div>
      ) : (
        <div className='schedule'>{getSchedule()}</div>
      )}
      {open ? (
        <ClassDialog
          isOpen={open}
          yogaClass={selectedYogaClass}
          closeDialog={handleDialogClose}
        />
      ) : null}
      {zoomLinkOpen ? (
        <ClassZoomLinkDialog
          isOpen={zoomLinkOpen}
          userData={userData}
          closeDialog={handleZoomDialogClose}
          yogaClass={selectedYogaClass}
          updateSelectedClassLink={updateSelectedClassLink}
        />
      ) : null}
      <ToastContainer
        closeButton={false}
        position='top-center'
        limit={1}
        progressStyle={{
          background: '#5E54AC',
        }}
      />
    </div>
  )
}
