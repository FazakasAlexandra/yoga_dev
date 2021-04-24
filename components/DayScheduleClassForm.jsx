import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';


export default function DayScheduleClass({ dayScheduleClass, handleInfoIconClick, removeClass }) {
    const [yogaClass, setYogaClass] = useState(dayScheduleClass)
    const [editMode, setEditMode] = useState(yogaClass.newClass || false)
    const [className, setClassName] = useState(yogaClass.className)

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#6CBBC7",
            },
        },
    });

    const handleClassNameChange = (e) => {
        setClassName(e.target.value)
    }
    const controlProps = (item) => ({
        checked: yogaClass.classType === item,
        value: item,
        theme: theme,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    return (
        <ThemeProvider theme={theme} key={yogaClass.id}>
            <div className="class wraper from">
                <div className="class info-wraper">

                    <div className="class info">
                        {editMode ? 
                        <TextField id="standard-basic" 
                        defaultValue={yogaClass.hour} 
                        label="Hour" 
                        style={{maxWidth: "40px", marginBottom: '0.5rem'}}/> 
                        : <p style={{ margin: "0px" }}>{yogaClass.hour}</p>}
                        <span>{yogaClass.onlinePrice} lei</span>
                    </div>

                    <div className="class radio">
                        {editMode ?
                            <FormControl>
                                <InputLabel htmlFor="age-native-helper">Class</InputLabel>
                                <NativeSelect
                                    value={className}
                                    onChange={handleClassNameChange}
                                    inputProps={{
                                        name: 'age',
                                        id: 'age-native-helper',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value="Yoga for back and sholders">Yoga for back and sholders</option>
                                    <option value="Yoga for intermediates">Yoga for intermediates</option>
                                    <option value="Fast flow">Fast flow</option>
                                </NativeSelect>
                                <FormHelperText>Chose one of the existing classes</FormHelperText>
                            </FormControl>
                            : <p style={{ marginTop: "0px" }}>{yogaClass.className}</p>
                        }
                        {editMode ? <span className="blue-text" onClick={()=>handleInfoIconClick(yogaClass)}>Change class description</span> : null}
                    </div>

                </div>
                {
                    editMode ?
                        <div className="buttons-container">
                            <button className="button-white" onClick={() => setEditMode(false)} style={{ backgroundColor: "#76E294" }}>
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    size="lg"
                                    className="info-icon"
                                />
                            </button>
                            <button className="button-white" onClick={() => setEditMode(false)}>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    size="lg"
                                    className="info-icon"
                                />
                            </button>
                            <button className="button-white" onClick={() => {
                                setEditMode(false)
                                removeClass(yogaClass)
                            }} style={{ backgroundColor: "#FF5D23" }}>
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    size="lg"
                                    className="info-icon"
                                />
                            </button>
                        </div> :
                        <button className="button-white" onClick={() => {
                            setEditMode(true)
                            console.log(yogaClass)
                        }}>
                            <FontAwesomeIcon
                                icon={faPen}
                                size="lg"
                                className="info-icon"
                            />
                        </button>
                }
            </div>
        </ThemeProvider>
    )
}
