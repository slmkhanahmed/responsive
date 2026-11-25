import { useState } from "react";
import initial_data from "../public/data.json";

type ProductRequestData = typeof initial_data;
export function useLocalStorage(initial_data: ProductRequestData) {
    const [data, setData] = useState<ProductRequestData>(() => {
        // A deep-linked feedback route must find saved records on its first render.
        try {
            const savedData = localStorage.getItem('data');
            return savedData ? JSON.parse(savedData) : initial_data;
        } catch {
            return initial_data;
        }
    });

    const setLocalStorageData = (new_data: ProductRequestData) => {
        setData(new_data);
        localStorage.setItem('data', JSON.stringify(data));
    }
    return { data, setData: setLocalStorageData };
}