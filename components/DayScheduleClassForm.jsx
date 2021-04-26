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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#6CBBC7",
        },
    },
});

export default function DayScheduleClass({ yogaClass, handleInfoIconClick, removeClass, toggleEditMode }) {
    const editMode = yogaClass.newClass || false

    const handleClassNameChange = (e) => {
        setClassName(e.target.value)
    }

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
                                <InputLabel htmlFor="age-native-helper"></InputLabel>
                                <NativeSelect
                                    value={yogaClass.className}
                                    onChange={handleClassNameChange}
                                    inputProps={{
                                        name: 'age',
                                        id: 'age-native-helper',
                                    }}
                                >
                                    <option aria-label="None" value="">{yogaClass.id}</option>
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
                            <button className="button-white" onClick={() => toggleEditMode(yogaClass.id, false)} style={{ backgroundColor: "#76E294" }}>
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    size="lg"
                                    className="info-icon"
                                />
                            </button>
                            <button className="button-white" onClick={() => toggleEditMode(yogaClass.id, false)}>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    size="lg"
                                    className="info-icon"
                                />
                            </button>
                            <button className="button-white" onClick={() => {
                                toggleEditMode(yogaClass.id, false)
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
                            toggleEditMode(yogaClass.id, true)
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
