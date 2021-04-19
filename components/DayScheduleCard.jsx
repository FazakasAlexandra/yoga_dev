import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useEffect, useState } from 'react';
import ClassDialog from './ClassDialog';

export default function DayScheduleCard({ daySchedule, src }) {
  console.log(daySchedule)
  const [selectedValue, setSelectedValue] = useState('online')
  const [open, setOpen] = useState(false);
  const [yogaClass, setYogaClass] = useState(null);

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleInfoIconClick = (yogaClass) => {
    console.log('clicked')
    setOpen(true);
    setYogaClass(yogaClass)
  } 

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#6CBBC7",
      },
    },
  });

  const controlProps = (item) => ({
    checked: selectedValue === item,
    value: item,
    theme: theme,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const getSchedule = () => {
    return daySchedule.schedule.map((yogaClass, idx) => {
      return (
        <ThemeProvider theme={theme} key={idx}>
          <div className="class wraper">
            <div className="class info-wraper">

              <div className="class info">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  size="lg"
                  style={{ color: "#C4E4E9", cursor: "pointer"}}
                  className="info-icon"
                  onClick={()=>handleInfoIconClick(yogaClass)}
                />
                <p>{yogaClass.hour}</p>
                <span>{yogaClass.onlinePrice} lei</span>
              </div>

              <div className="class radio">
                <p>{yogaClass.className}</p>
                <RadioGroup aria-label="class-type" name="class-type" value={selectedValue} onChange={handleChange} style={{ flexDirection: "row" }}>
                  <FormControlLabel
                    value="offline"
                    control={<Radio {...controlProps('offline')} color="primary" />}
                    label="offline"
                  />

                  <FormControlLabel
                    value="online"
                    control={<Radio {...controlProps('online')} color="primary" />}
                    label="online"
                  />
                </RadioGroup>
              </div>

            </div>

            <a className="button-white">Book</a>
          </div>
        </ThemeProvider>
      )
    })
  }

  return (
    <div className="day-schedule card">
      <div className="head">
        <img src={`/assets/lotus.svg`} alt="lotus flower" />
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
