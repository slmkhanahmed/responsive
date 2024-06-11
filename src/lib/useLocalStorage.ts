import { useState, useEffect } from "react";
import initial_data from "../public/data.json";

type ProductRequestData = typeof initial_data;
export function useLocalStorage(initial_data: ProductRequestData) {
    const [data, setData] = useState<ProductRequestData>(initial_data);
    useEffect(() => {
        const data = localStorage.getItem('data');
        if (data) {
            setData(JSON.parse(data));
        }
    }, []);

    const setLocalStorageData = (new_data: ProductRequestData) => {
        setData(new_data);
        localStorage.setItem('data', JSON.stringify(data));
    }
    return { data, setData: setLocalStorageData };
}