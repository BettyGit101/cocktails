import React, {useEffect, useState, Suspense, lazy} from 'react';
import { CircularProgress } from "@mui/material";

import styles from './Home.module.css';
import useFetch from '../hooks/useFetch';
import Search from '../components/Search/Search';
import {BasicDrink} from '../assets/types';
import Cocktails from '../components/Cocktails/AllCocktails';
import {KEY_STORAGE, GET_ALL_COCKTAILS_URL, NO_DATA_FOUND, ERROR_CALLING_API} from '../assets/constants';

const Home = () => {
  const NotificationLazy = lazy(() => import("../ui/Notification"));

  const [cocktailList, setCocktailList] = useState<BasicDrink[]>([]);
  const [searchedResults, setSearchedResults] = useState<BasicDrink[]>([]);
  const { isLoading, error, sendRequest: fetchCocktailsData } = useFetch(KEY_STORAGE);
  

  const setCocktailsData = (apiCocktailsData: BasicDrink[]) => {
    setCocktailList(apiCocktailsData);
    localStorage.setItem(KEY_STORAGE, JSON.stringify(apiCocktailsData));
  }


  useEffect(() => {
    fetchCocktailsData(GET_ALL_COCKTAILS_URL, setCocktailsData);
  },[])


  const setPageContentDisplay = () => {
    if (isLoading) {
      return (
        <div className={styles.home_spinner}>
          <CircularProgress />
        </div>
      );
    } 
    else if (error) {
      return (
        <Suspense fallback={<CircularProgress />}>
          <NotificationLazy message={ERROR_CALLING_API} />
        </Suspense>
      );
    } 
    else if (cocktailList?.length > 0) {
      const displayData = searchedResults.length === 0? cocktailList : searchedResults; 
      return (
        <div className={styles.home_content}>
          <Cocktails data={displayData} />
        </div>
      );
    }
    else if (cocktailList?.length === 0) {
      return (
        <Suspense fallback={<CircularProgress />}>
          <NotificationLazy message={NO_DATA_FOUND} />
        </Suspense>
      );
    } 
  }

  const setApiSearchedData = (data:BasicDrink[]) => {
    setSearchedResults(data);
  }
  
  return (
    <div>
      <Search setApiSearchedData={setApiSearchedData}/>
      {setPageContentDisplay()}
    </div>
  )
}

export default Home;