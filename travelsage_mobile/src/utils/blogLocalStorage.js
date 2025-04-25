// utils/storage.js
import RNStorage from 'rn-secure-storage';

export const saveFormData = async (screen, data) => {
    try {
        await RNStorage.setItem(screen, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving form data', error);
    }
};

export const loadFormData = async (screen) => {
    try {
        const data = await RNStorage.getItem(screen);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.log('Error loading form data', error);
        return null;
    }
};
