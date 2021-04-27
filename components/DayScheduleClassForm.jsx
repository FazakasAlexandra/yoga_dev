import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useEffect, useState } from 'react';
import db from '../db.js'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#6CBBC7",
        },
    },
});

export default function DayScheduleClass({ yogaClass, removeClass, toggleEditMode, updateSchedule }) {
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
        const newClass = classes.find((yogaClass) => yogaClass.id === e.target.value)
        setChangedYogaClass(newClass)
    }

    const handleSaveClick = () => {
        updateSchedule({
            id: yogaClass.id,
            schedulesWeeksId: yogaClass.schedulesWeeksId,
            classDescription : changedYogaClass.description,
            className : changedYogaClass.name,
            classLevel : changedYogaClass.level,
            onllinePrice : changedYogaClass.online_price,
            offlinePrice : changedYogaClass.offline_price,
            hour
        })
    }

    const getOptions = () => {
        return classes.map((fetchedYogaClass, idx) => {
            return <option
                selected={fetchedYogaClass.name === yogaClass.className ? true : false}
                key={idx}
                value={fetchedYogaClass.id}>{fetchedYogaClass.name}
            </option>
        })
    }

    return (
        <ThemeProvider theme={theme} key={yogaClass.id}>
            <div className="class wraper from">
                <div className="class info-wraper">

                    <div className="class info">
                        {editMode ?
                            <TextField id="standard-basic"
                                defaultValue={hour}
                                label="Hour"
                                onChange={(e) => setHour(e.target.value)}
                                style={{ maxWidth: "40px", marginBottom: '0.5rem' }} />
                            : <p>{hour}</p>}
                        <b>OFFLINE</b>
                        <span>{changedYogaClass.offline_price || yogaClass.offlinePrice} lei</span>
                        <b>ONLINE</b>
                        <span>{changedYogaClass.online_price || yogaClass.onlinePrice} lei</span>
                    </div>

                    <div className="class radio">
                        {editMode ?
                            <FormControl>
                                <InputLabel htmlFor="age-native-helper"></InputLabel>
                                <NativeSelect
                                    value={changedYogaClass.name}
                                    onChange={handleClassChange}
                                >
                                    <option value={changedYogaClass.id}>{changedYogaClass.name}</option>
                                    {getOptions()}
                                </NativeSelect>
                                <FormHelperText>Chose one of the existing classes</FormHelperText>
                            </FormControl>
                            : <p style={{ marginTop: "0px" }}>{yogaClass.className}</p>
                        }
                    </div>

                </div>
                {
                    editMode ?
                        <div className="buttons-container">
                            <button className="button-white" onClick={() => handleSaveClick()} style={{ backgroundColor: "#76E294" }}>
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    size="lg"
                                    className="info-icon"
                                />
                            </button>
                            <button className="button-white" onClick={() => {
                                toggleEditMode(yogaClass.id, false)
                                setChangedYogaClass({})
                                setHour(yogaClass.hour)
                            }}>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    size="lg"
                                    className="info-icon"
                                />
                            </button>
                            <button className="button-white" onClick={() => {
                                removeClass(yogaClass, changedYogaClass)
                            }} style={{ backgroundColor: "#FF5D23" }}>
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    size="lg"
                                    className="info-icon"
                                />
                            </button>
                        </div> 
                        : <button className="button-white" onClick={() => {
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
        </ThemeProvider >
    )
}
