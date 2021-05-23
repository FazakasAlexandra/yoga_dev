import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { useEffect, useState } from 'react'
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';

export default function SubscriptionFormInputs({ buttonText, yogaClasses, selectionList, addSelection }) {
    const [selectedYogaClass, setSelectedYogaClass] = useState({ id: '' })
    const [yogaClassAmount, setYogaClassAmount] = useState(0)
    const [yogaClassType, setYogaClassType] = useState("online")

    const getSelectOptions = () => {
        return yogaClasses.map(({ id, name }) => {
            return <MenuItem key={id} value={id}>{name}</MenuItem>
        })
    }

    return (
        <div style={{ width: "100%" }}>
            <TextField
                label={yogaClassAmount}
                variant='outlined'
                type='number'
                style={{ width: "35%" }}
                onChange={(e) => setYogaClassAmount(e.target.value)}
            />
            <FormControl variant='outlined' style={{ width: "65%", maxWidth: "200px" }}>
                <InputLabel>Select a class</InputLabel>
                <Select
                    value={selectedYogaClass.id}
                    onChange={(e) => setSelectedYogaClass(e.target.value)}
                >
                    {getSelectOptions()}
                </Select>
            </FormControl>

            <RadioGroup
                aria-label="class-type"
                name="class-type"
                value={yogaClassType}
                style={{ flexDirection: "row", marginBottom: "1rem" }}
                onChange={(e) => setYogaClassType(e.target.value)}
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
            <Button
                color="primary"
                variant="contained"
                component="span"
                style={{ width: "100%" }}
                onClick={
                    () => addSelection({
                        selectedYogaClass,
                        yogaClassAmount,
                        yogaClassType
                    })
                }>
                <FontAwesomeIcon
                    icon={faPlus}
                    size="2x"
                    style={{ marginRight: "1rem" }}
                />
                <span>{buttonText}</span>
            </Button>
            <ul>
                {selectionList()}
            </ul>
        </div>
    )
}