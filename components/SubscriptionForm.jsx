import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { useEffect, useState } from 'react'
import db from '../db'
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { theme } from '../utilities.js';
import { getWeekWithOptions } from 'date-fns/fp';
import MenuItem from '@material-ui/core/MenuItem';
import { setMonth } from 'date-fns';

const controlProps = (item) => ({
    value: item,
    theme: theme,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
});

export default function subscriptionsForm({ removeForm, addNewSubscriptionCard, id }) {
    const [image, setImage] = useState("http://localhost/yoga/public/assets/subscriptions/icon.svg")
    const [yogaClasses, setYogaClasses] = useState([])

    const [months, setMonths] = useState(0)
    const [entrences, setEntrences] = useState(0)
    const [price, setPrice] = useState(0)
    const [subscriptionName, setName] = useState("")

    const [discountedYogaClass, setDiscountedYogaClass] = useState({ id: '' })
    const [discountPercentage, setDiscountPercentege] = useState(0)
    const [discountedYogaClassType, setDiscountedYogaClassType] = useState("online")
    const [discounts, setDiscounts] = useState([])

    const [freeYogaClass, setFreeYogaClass] = useState({ id: '' })
    const [freeYogaClassNr, setFreeYogaClassNr] = useState(0)
    const [freeYogaClassType, setFreeYogaClassType] = useState("online")
    const [free_entrences, setFreeEntrences] = useState([])

    const getSelectOptions = () => {
        return yogaClasses.map(({ id, name }) => {
            return <MenuItem key={id} value={id}>{name}</MenuItem>
        })
    }

    const getFreeEntrences = () => {
        return free_entrences.map(({ amount, class_name, class_type }) => {
            return <li><b>{amount} free</b> classes for {class_type} <i>{class_name}</i></li>
        })
    }

    const getDiscounts = () => {
        return discounts.map(({ discount, class_name, class_type }) => {
            return <li><b>{discount} %</b> off from all <i>{class_name}</i> {class_type} classes</li>
        })
    }

    const discountedClassChange = (id) => {
        const selectedClass = yogaClasses.find(yogaClass => yogaClass.id == id)
        console.log(selectedClass)
        setDiscountedYogaClass(selectedClass)
    }

    const freeClassChange = (id) => {
        const selectedClass = yogaClasses.find(yogaClass => yogaClass.id == id)
        setFreeYogaClass(selectedClass)
    }

    const addClassDiscount = () => {
        const discount = {
            class_id: discountedYogaClass.id,
            class_name: discountedYogaClass.name,
            class_type: discountedYogaClassType,
            discount: +discountPercentage
        }
        setDiscounts([discount, ...discounts])
    }

    const addNewSubscription = () => {
        const newSubscription = {
            name: subscriptionName,
            months,
            attendences: entrences,
            price,
            image,
            discounts,
            free_entrences
        }

        db.getJWT().then((jwt) => {
            console.log('gives : ', newSubscription)
            db.subscriptions.postSubscription(newSubscription, jwt).then((res) => {
                console.log('recieves : ', res.data)
                addNewSubscriptionCard(res.data)
                removeForm(id)
            })
        })
    }

    function handleFileInputChange(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener("load", () => {
            setImage(reader.result)
        });
    }

    const addFreeClass = () => {
        const newFreeEntrence = {
            class_id: freeYogaClass.id,
            class_name: freeYogaClass.name,
            amount: +freeYogaClassNr,
            class_type: freeYogaClassType
        }

        setFreeEntrences([newFreeEntrence, ...free_entrences])
    }

    useEffect(() => {
        console.log(free_entrences)
    }, [free_entrences])

    useEffect(() => {
        db.classes.getClasses().then(res => setYogaClasses(res.data))
    }, [])

    return (
        <div className="subscription-card form">
            <div className="buttons-container">
                <button className="button-white checked" onClick={() => addNewSubscription()}>
                    <FontAwesomeIcon
                        icon={faCheck}
                        size="2x"
                    />
                </button>
                <button className="dlt-button-white" onClick={() => removeForm(id)}>
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        size="2x"
                    />
                </button>
            </div>
            <div className="form-body">
                <TextField
                    id="standard-basic"
                    label="Subscription Name"
                    variant='outlined'
                    value={subscriptionName}
                    style={{ width: "100%" }}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="upload-photo" style={{ marginTop: "1rem" }}>
                    <input
                        style={{ display: 'none' }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={(e) => handleFileInputChange(e)}
                        accept="image/png, image/jpeg, image/jpg"
                    />
                    <Button color="primary" variant="contained" component="span" style={{ width: "190px" }}>
                        Upload Picture
                    </Button>
                </label>
                <img src={image} />

                <div className="nr-inputs">
                    <TextField
                        id="standard-basic"
                        label="Months"
                        variant='outlined'
                        type='number'
                        style={{ width: "100%" }}
                        onChange={(e) => setMonths(e.target.value)}
                    />
                    <TextField
                        id="standard-basic"
                        label="Entrences"
                        variant='outlined'
                        type='number'
                        style={{ width: "100%" }}
                        onChange={(e) => setEntrences(e.target.value)}
                    />
                    <TextField
                        id="standard-basic"
                        label="Price €"
                        variant='outlined'
                        type='number'
                        style={{ width: "100%" }}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <hr />
                <div style={{ width: "100%" }}>
                    <div className="free-class">
                        <TextField
                            id="standard-basic"
                            label="Number"
                            variant='outlined'
                            type='number'
                            style={{ width: "35%" }}
                            onChange={(e) => setFreeYogaClassNr(e.target.value)}
                        />
                        <FormControl variant='outlined' style={{ width: "65%", maxWidth: "200px" }}>
                            <InputLabel htmlFor="age-native-helper">Select a class</InputLabel>
                            <Select
                                value={freeYogaClass.id}
                                onChange={(e) => freeClassChange(e.target.value)}
                            >
                                {getSelectOptions()}
                            </Select>
                        </FormControl>
                    </div>
                    <RadioGroup
                        aria-label="class-type"
                        name="class-type"
                        value={freeYogaClassType}
                        style={{ flexDirection: "row", marginBottom: "1rem" }}
                        onChange={(e) => setFreeYogaClassType(e.target.value)}
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
                    <Button color="primary" variant="contained" component="span" style={{ width: "100%" }} onClick={addFreeClass}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            size="2x"
                            style={{ marginRight: "1rem" }}
                        />
                        <span>Free Entrences</span>
                    </Button>
                    <ul>
                        {getFreeEntrences()}
                    </ul>
                    <hr />
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Discount %"
                            variant='outlined'
                            type='Number'
                            style={{ width: "35%" }}
                            onChange={(e) => setDiscountPercentege(e.target.value)}
                        />
                        <FormControl variant='outlined' style={{ width: "65%", maxWidth: "200px" }}>
                            <InputLabel htmlFor="age-native-helper">Select a class</InputLabel>
                            <Select
                                value={discountedYogaClass.id}
                                onChange={(e) => discountedClassChange(e.target.value)}
                            >
                                {getSelectOptions()}
                            </Select>
                        </FormControl>
                        <div className="subscription radio" style={{ marginBottom: "1rem" }}>
                            <RadioGroup
                                aria-label="class-type"
                                name="class-type"
                                value={discountedYogaClassType}
                                style={{ flexDirection: "row", marginBottom: "1rem" }}
                                onChange={(e) => setDiscountedYogaClassType(e.target.value)}
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
                            <Button color="primary" variant="contained" component="span" style={{ width: "100%" }} onClick={() => addClassDiscount()}>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    size="2x"
                                    style={{ marginRight: "1rem" }}
                                />
                                <span>Class Discount</span>
                            </Button>
                            <ul>
                                {getDiscounts()}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
