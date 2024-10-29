import {useEffect, useState} from "react";
import styles from './AliensTable.module.scss';
import {getAliens} from "../../api/apiServices";
import Button from "@mui/material/Button";
import BasicModal from "../common/BasicModal/BasicModal";
import AddAlienForm from "../AddAlienForm/AddAlienForm";
import * as React from "react";

export default function AliensTable() {
    const [aliens, setAliens] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchAliens();
    }, []);

    const fetchAliens = async () => {
        try {
            const data = await getAliens();
            setAliens(data);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        }
    };
    const handleOpenModal = () => setOpenModal(true);
    const handleAddSuccess = () => {
        setOpenModal(false);
        fetchAliens();
    }

    return (
        <div>
            <Button onClick={handleOpenModal}>Add alien</Button>
            <BasicModal title="Add alien" content={<AddAlienForm onSuccess={handleAddSuccess}/>} open={openModal}
                        setOpen={setOpenModal}/>
            <table className={styles['aliens-table']}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Weapon</th>
                    <th>Vehicle</th>
                    <th>Commander id</th>
                    <th>Commander name</th>
                </tr>
                </thead>
                <tbody>
                {aliens.map((alien, key) => {
                    return (
                        <tr key={key}>
                            <td>{alien.id}</td>
                            <td>{alien.name}</td>
                            <td>{alien.weapon}</td>
                            <td>{alien.vehicle}</td>
                            <td>{alien.commander_id}</td>
                            <td>{alien.commander_name}</td>

                        </tr>)
                })}
                </tbody>
            </table>
        </div>

    )
}