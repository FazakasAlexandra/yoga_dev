import { useEffect, useState } from 'react';
import DayScheduleClassForm from './DayScheduleClassForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '../utilities.js'
import _ from 'lodash'

export default function DayScheduleCard({ dayData, schedule, updateWeekSchedule, dayNumber }) {
    const [daySchedule, setDaySchedule] = useState(schedule);

    const addNewClass = () => {
        const newClass = {
            id: _.uniqueId('newclass'),
            class_id: '',
            classDescription: "",
            classLevel: "",
            className: "",
            hour: "",
            offlinePrice: "0",
            onlinePrice: "0",
            schedulesWeeksId: null,
            editMode: true
        }
        setDaySchedule([...daySchedule, newClass])
    }

    useEffect(()=>{
        updateWeekSchedule({...dayData, schedule: daySchedule}, dayNumber)
    }, [daySchedule])

    const updateSchedule = (updatedYogaClass) => {
        const newDaySchedule = daySchedule.map(dayYogaClass => {
            if(dayYogaClass.id == updatedYogaClass.id) return updatedYogaClass
            return dayYogaClass
        })
        setDaySchedule(newDaySchedule)
    } 

    const removeClass = (removedClass) => {
        const newDaySchedule = daySchedule.filter((yogaClassItem) => yogaClassItem.id !== removedClass.id)
        setDaySchedule(newDaySchedule);
    }

    const toggleEditMode = (classId, bool) => {
        setDaySchedule(daySchedule.map(yogaClass => {
            if (yogaClass.id === classId) return {...yogaClass, editMode: bool}
            return yogaClass
        }))
    }

    const getSchedule = () => {
        return daySchedule.map((dayScheduleYogaClass) => {
            return (
                <DayScheduleClassForm
                    key={dayScheduleYogaClass.id}
                    yogaClass={dayScheduleYogaClass}
                    removeClass={removeClass}
                    toggleEditMode={toggleEditMode}
                    updateSchedule={updateSchedule}
                    day={dayNumber}
                />
            )
        })
    }

    const getDate = (date) => {
        return (
          <span className="date">
          <span>{date.day} </span><span>{date.month}</span>
          </span>
        )
      }    

    return (
        <div className="day-schedule card">
            <div className="head">
                <img src={`/assets/lotus.svg`} alt="lotus flower" />
                <h3>{dayData.day}</h3>
                {getDate(formatDate(dayData.date))}
                <button className="button-white" style={{ alignSelf: "baseline" }} onClick={() => addNewClass()}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        size="lg"
                        className="info-icon"
                    />
                </button>
            </div>

            {
                <div className="schedule">
                    {getSchedule()}
                </div>
            }
        </div>
    )
}
