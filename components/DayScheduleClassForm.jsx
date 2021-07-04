import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPen,
  faTimes,
  faCheck,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { ThemeProvider } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import NativeSelect from '@material-ui/core/NativeSelect'
import { useEffect, useState } from 'react'
import db from '../db.js'
import { theme } from '../utilities.js'

export default function DayScheduleClass({
  yogaClass,
  removeClass,
  toggleEditMode,
  updateSchedule,
}) {
  const editMode = yogaClass.editMode || false
  const [classes, setClasses] = useState([])
  const [changedYogaClass, setChangedYogaClass] = useState({})
  const [hour, setHour] = useState(yogaClass.hour)

  useEffect(() => {
    db.classes.getClasses().then((res) => {
      setClasses(res.data)
    })
  }, [])

  const handleClassChange = (e) => {
    const newChangedYogaClass = {
      ...classes.find((yogaClass) => yogaClass.id == e.target.value),
    }
    newChangedYogaClass.class_id = newChangedYogaClass.id
    newChangedYogaClass.id = yogaClass.id
    setChangedYogaClass(newChangedYogaClass)
  }

  const handleSaveClick = () => {
    updateSchedule({
      ...changedYogaClass,
      id: yogaClass.id,
      schedules_weeks_id: yogaClass.schedules_weeks_id,
      hour,
    })
  }

  const getOptions = () => {
    return classes.map((fetchedYogaClass, idx) => {
      return (
        <option key={fetchedYogaClass.id + idx} value={fetchedYogaClass.id}>
          {fetchedYogaClass.name}
        </option>
      )
    })
  }

  return (
    <ThemeProvider theme={theme} key={yogaClass.id}>
      <div className='class wraper from'>
        <div className='class info-wraper'>
          <div className='class info'>
            {editMode ? (
              <TextField
                id='standard-basic'
                defaultValue={hour}
                label='Hour'
                id={`${yogaClass.id}-hour`}
                onChange={(e) => setHour(e.target.value)}
                style={{ width: '50px', marginBottom: '0.5rem' }}
                inputProps={{ maxLength: 5 }}
              />
            ) : (
              <p>{hour}</p>
            )}
            <b>OFFLINE</b>
            <span>
              {changedYogaClass.offline_price || yogaClass.offline_price} lei
            </span>
            <b>ONLINE</b>
            <span>
              {changedYogaClass.online_price || yogaClass.online_price} lei
            </span>
          </div>

          <div className='class radio'>
            {editMode ? (
              <FormControl>
                <InputLabel htmlFor='age-native-helper'></InputLabel>
                <NativeSelect
                  value={changedYogaClass.class_id || yogaClass.class_id}
                  onChange={handleClassChange}
                >
                  <option value=''>Please select</option>
                  {getOptions()}
                </NativeSelect>
                <FormHelperText style={{ padding: '0px' }}>
                  Chose a class
                </FormHelperText>
              </FormControl>
            ) : (
              <p style={{ marginTop: '0px' }}>{yogaClass.name}</p>
            )}
          </div>
        </div>
        {editMode ? (
          <div className='buttons-container'>
            <button
              className='button-white'
              onClick={() => handleSaveClick()}
              style={{ backgroundColor: '#76E294' }}
            >
              <FontAwesomeIcon icon={faCheck} size='lg' className='info-icon' />
            </button>
            <button
              className='button-white'
              onClick={() => {
                toggleEditMode(yogaClass.id, false)
                setHour(yogaClass.hour)
              }}
            >
              <FontAwesomeIcon icon={faTimes} size='lg' className='info-icon' />
            </button>
            <button
              className='button-white'
              onClick={() => {
                removeClass(yogaClass)
              }}
              style={{ backgroundColor: '#FF5D23' }}
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                size='lg'
                className='info-icon'
              />
            </button>
          </div>
        ) : (
          <button
            className='button-white'
            onClick={() => {
              toggleEditMode(yogaClass.id, true)
            }}
          >
            <FontAwesomeIcon icon={faPen} size='lg' className='info-icon' />
          </button>
        )}
      </div>
    </ThemeProvider>
  )
}
