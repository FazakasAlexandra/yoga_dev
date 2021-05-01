import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { ThemeProvider } from "@material-ui/core";
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useEffect, useState } from 'react';
import { theme } from '../utilities.js';


export default function DayScheduleClass({ dayScheduleClass, handleInfoIconClick, handleBookClick, isBooked}) {
    const [yogaClass, setYogaClass] = useState(dayScheduleClass)

    const handleRadioChange = (e) => setYogaClass({ ...yogaClass, classType: e.target.value });

    const controlProps = (item) => ({
        checked: yogaClass.classType === item,
        value: item,
        theme: theme,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    return (
        <ThemeProvider theme={theme} key={yogaClass.id}>
            <div className="class wraper">
                <div className="class info-wraper">

                    <div className="class info">
                        <FontAwesomeIcon
                            icon={faInfoCircle}
                            size="lg"
                            style={{ color: "#C4E4E9", cursor: "pointer" }}
                            className="info-icon"
                            onClick={() => handleInfoIconClick(yogaClass)}
                        />
                        <p>{yogaClass.hour}</p>
                        <span>{yogaClass.online_price} lei</span>
                    </div>

                    <div className="class radio">
                        <p>{yogaClass.name}</p>
                        <RadioGroup
                            aria-label="class-type"
                            name="class-type"
                            value={yogaClass.classType}
                            onChange={(e) => handleRadioChange(e)}
                            style={{ flexDirection: "row" }}
                        >
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
                {
                   isBooked ? "BOOKED" : <a className="button-white" onClick={() => handleBookClick(yogaClass)}>Book</a>
                }
            </div>
        </ThemeProvider>
    )
}
