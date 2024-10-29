import axios from 'axios';

export const getAliens = async () => {
    try {
        const response = await axios.get("/getAll");
        return response.data;
    } catch (error) {
        console.error('Error fetching aliens:', error);
        throw error;
    }
};

export const saveAlien = async (alien) => {
    try {
        const response = await axios.post("/newAlien", alien);
        return response.data;
    } catch (error) {
        console.error('Error saving alien:', error);
        throw error;
    }
};