import alienTypes from "../../utils/alienTypes";
import {useState} from "react";
import AlienTypes from "../../utils/alienTypes";
import weapons from "../../utils/weapons";
import commanderVehicles from "../../utils/commanderVehicles";
import {saveAlien} from "../../api/apiServices";
import styles from "./AddAlienForm.module.scss"

export default function AddAlienForm({onSuccess, onFailure}) {
    const [alienType, setAlienType] = useState(AlienTypes.WARRIOR);

    async function addAlien(event) {
        event.preventDefault();
        const formData = (Array.from(event.target.elements)).filter(element => !!element.name).reduce(
            (accumulator, currentValue) => ({...accumulator, [currentValue.name]: currentValue.value}),
            {},
        );

        try {
            const alien = await saveAlien(formData);
            onSuccess(alien);
        } catch (error) {
            console.error('Error fetching aliens:', error);
            onFailure(error)
        }
    }

    function changeAlienType(event) {
        setAlienType(event.target.value);
    }

    return (
        <form onSubmit={addAlien} className={styles['aliens-form']}>
            <div>
                <label htmlFor="type">Type</label>
                <select name="type" onChange={changeAlienType}>
                    {Object.entries(alienTypes)
                        .map(([k, v]) =>
                            <option key={k} value={k}>{v}</option>)
                    }
                < /select>
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input name="name" type="text"/>
            </div>
            {alienType === AlienTypes.WARRIOR ?
                <div>
                    <label htmlFor="weapon">Weapon</label>
                    <select name="weapon" defaultValue={weapons.PEPPER_SPRAY}>
                        {Object.entries(weapons)
                            .map(([k, v]) =>
                                <option key={k} value={k}>{v}</option>)}
                    </select>
                </div> :
                <div>
                    <label htmlFor="vehicle">Vehicle</label>
                    <select name="vehicle" defaultValue={weapons.PEPPER_SPRAY}>
                        {Object.entries(commanderVehicles(alienType === AlienTypes.CHIEF))
                            .map(([k, v]) =>
                                <option key={k} value={k}>{v}</option>)}
                    </select>
                </div>
            }
            <button type="submit">Add Alien</button>
        </form>
    )
}