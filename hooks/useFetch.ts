import { useState } from 'react';
import axios from 'axios';

const useFetch = () => {
    const [data, setData] = useState<Record<string, unknown>[]>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const callAPI = async (url: string) => {
        setIsLoading(true);
        try {
            const res = await axios.get('https://fakestoreapi.com/'+url);
            setData(res.data);
        } catch {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const triggerFetch = (url: string) => callAPI(url);

    return {data, isLoading, error, triggerFetch};
};

export default useFetch;
