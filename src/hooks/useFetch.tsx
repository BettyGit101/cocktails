
import { useState } from "react";
import { ApplyData } from "../assets/types";
import axios from "axios";

const useFetch = (storageKey?: string) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async(url: string, applyData: ApplyData) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.get(url);
      applyData(response.data.drinks);
    } 
    catch (err: any) {  
      if (storageKey) {
        const cachedData = localStorage.getItem(storageKey);
        if (cachedData) {
          applyData(JSON.parse(cachedData));
        } else {
          setError(err.message);
        }
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    sendRequest,
  };
};

export default useFetch;
