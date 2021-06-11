import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faChevronLeft, faChevronRight, faVideo } from '@fortawesome/free-solid-svg-icons'
import { duration, ThemeProvider } from "@material-ui/core";
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useEffect, useState } from 'react';
import { theme } from '../utilities.js';

export default function DayScheduleClass({ dayScheduleClass,
    handleInfoIconClick,
    handleBookClick,
    isBooked,
    handleArrowButton,
    minimal,
    active,
    handleZoomLinkClick
}) {
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
                        {minimal ? null :
                            <div style={{display:"flex"}}>
                                <FontAwesomeIcon
                                    icon={faInfoCircle}
                                    size="lg"
                                    style={{ color: "#C4E4E9", cursor: "pointer", marginRight: '0.5rem' }}
                                    className="info-icon"
                                    onClick={() => handleInfoIconClick(yogaClass)}
                                />
                                <FontAwesomeIcon
                                    icon={faVideo}
                                    size="lg"
                                    style={{ color: "#C4E4E9", cursor: "pointer" }}
                                    className="info-icon"
                                    onClick={() => handleZoomLinkClick(yogaClass)}
                                />
                            </div>
                        }
                        <p>{yogaClass.hour}</p>
                        {minimal ? null : <span>{yogaClass.online_price} lei</span>}
                    </div>

                    <div className="class radio">
                        <p className={active ? "bold-text" : "thin-text"}>{yogaClass.name || yogaClass.class_name}</p>
                        {minimal ? null :
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
                        }
                    </div>

                </div>

                {
                    minimal ? null :
                        isBooked ? "BOOKED" : <a className="button-white" onClick={() => handleBookClick(yogaClass)}>Book</a>
                }
                {
                    minimal ? <FontAwesomeIcon
                        icon={active ? faChevronRight : faChevronLeft}
                        size="lg"
                        className="icon-chevron"
                        onClick={() => handleArrowButton(yogaClass.schedules_weeks_id)}
                    /> : null
                }
            </div>
        </ThemeProvider>
    )
}
