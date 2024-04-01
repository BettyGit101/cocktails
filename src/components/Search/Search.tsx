import React, {useState, useEffect} from 'react';
import Input from '../../ui/Input';
import styles from './Search.module.css';
import useFetch from '../../hooks/useFetch';
import useDebounce from '../../hooks/useDebounce';
import { CircularProgress } from "@mui/material";
import {SearchProps,BasicDrink} from '../../assets/types';
import {BASIC_URL, ERROR_NO_DATA_FOUND,ERROR_CALLING_API} from '../../assets/constants';


const Search = (props: SearchProps) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [searchedValue, setSearchedValue] = useState('');
  const debouncedSearchedValue = useDebounce(searchedValue);
  const { isLoading, error, sendRequest: fetchCocktailsByName } = useFetch();

  const setResults = (apiResult:BasicDrink) => {  
    if (apiResult) {
      props.setApiSearchedData(apiResult);
    }
    else {
      setErrorMsg(`${ERROR_NO_DATA_FOUND} ${debouncedSearchedValue}`)
    }
    if (!searchedValue) {
      props.setApiSearchedData([]);
    }
  }

  useEffect(() => {
    if (debouncedSearchedValue) {
      fetchCocktailsByName(`${BASIC_URL}/search.php?s=${searchedValue}`, setResults);
    } 
    else {
      setErrorMsg("");
    }
  }, [debouncedSearchedValue]);
  
  
 

  const onSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    setSearchedValue(e.target.value);    
  }

  const setErrorOrLoadingContent = () => {
    if (isLoading) {
      return (
        <div className={styles.search_spinner}>
          <CircularProgress />
        </div>
      )
    } 
    else if (error || errorMsg) {
      const errorDisplay = errorMsg ? errorMsg : ERROR_CALLING_API
      return(
        <div className={styles.search_error}>
          <p id="errorId">{errorDisplay}</p>
        </div>
      )
    }
  }

  const handleClearSearch = () => {
    setErrorMsg("");
    setSearchedValue("");
    props.setApiSearchedData([]);  
  }

  return(
    <div className={styles.search}>
      <div className={styles.search_row}>
        <Input type="text" id="seach"
              value={searchedValue}
              label="Please enter cocktail name"
              onChange={onSearchValueChange}/>
        <button onClick={handleClearSearch}>Clear Search</button>
      </div>
      <div className={styles.search_message}>
        {setErrorOrLoadingContent()}
      </div>
    </div>
  )
}

export default Search;