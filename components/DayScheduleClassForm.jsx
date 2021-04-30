import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { createMuiTheme, MenuItem, Select, ThemeProvider } from "@material-ui/core";
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

export default function DayScheduleClass({ yogaClass, removeClass, toggleEditMode, updateSchedule, day }) {
    const editMode = yogaClass.editMode || false
    const [classes, setClasses] = useState([])
    const [changedYogaClass, setChangedYogaClass] = useState({})
    const [hour, setHour] = useState(yogaClass.hour)

    console.log('changed yoga class : ', changedYogaClass, 'for day ', day)

    useEffect(() => {
        db.classes.getClasses().then((res) => {
            setClasses(res.data)
        })
    }, [])

    const handleClassChange = (e) => {
        const newChangedYogaClass = {...classes.find((yogaClass) => yogaClass.id == e.target.value)}
        newChangedYogaClass.class_id = newChangedYogaClass.id
        newChangedYogaClass.id = yogaClass.id
        setChangedYogaClass(newChangedYogaClass)
    }

    const handleSaveClick = () => {
        updateSchedule({
            id: yogaClass.id,
            class_id: changedYogaClass.class_id,
            schedulesWeeksId: yogaClass.schedulesWeeksId,
            classDescription: changedYogaClass.description,
            className: changedYogaClass.name,
            classLevel: changedYogaClass.level,
            onllinePrice: changedYogaClass.online_price,
            offlinePrice: changedYogaClass.offline_price,
            hour
        })
    }

    const getOptions = () => {
        return classes.map((fetchedYogaClass, idx) => {
            return <option
                key={fetchedYogaClass.id}
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
                            <TextField 
                                id="standard-basic"
                                defaultValue={hour}
                                label="Hour"
                                id={`${yogaClass.id}-hour`}
                                onChange={(e) => setHour(e.target.value)}
                                style={{ width: "50px", marginBottom: '0.5rem' }} />
                            :
                            <p>{hour}</p>}
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
                                    value={changedYogaClass.class_id || yogaClass.class_id}
                                    onChange={handleClassChange}
                                >
                                    <option value=''>Select</option>
                                    {getOptions()}
                                </NativeSelect>
                                <FormHelperText style={{ padding: "0px" }}>Chose a class</FormHelperText>
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
                                setHour(yogaClass.hour)
                            }}>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    size="lg"
                                    className="info-icon"
                                />
                            </button>
                            <button className="button-white" onClick={() => {
                                removeClass(yogaClass)
                            }} style={{ backgroundColor: "#FF5D23" }}>
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    size="lg"
                                    className="info-icon"
                                />{yogaClass.id}
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
