import React, { useState } from "react";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Modal from '../../ui/Modal';
import useFetch from '../../hooks/useFetch';
import SingleCocktail from "./SingleCocktail";
import styles from "./AllCocktails.module.css";
import { CircularProgress } from "@mui/material";
import { BasicDrink, SelectedCocktail } from "../../assets/types";
import {BASIC_URL, ingredientsObj, ERROR_CALLING_API} from '../../assets/constants';

const Cocktails = (props: { data: BasicDrink[] }) => {

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { isLoading, sendRequest: fetchSelectedById } = useFetch();
  const [selectedCocktailDetails, setSelectedCocktailDetails] = useState<SelectedCocktail>()
  const [selectedCocktailIngredients, setSelectedCocktailIngredients] = useState<string[]>([]);


  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
  }

  const setSelectedData = (apiResponse: SelectedCocktail[]) => {  
    if (apiResponse) {
      const ingredients = [];
      const selectedDrink = apiResponse[0];
  
      for (let i=1; i <= 15; i++) {
        const key = `strIngredient${i}`;
        const value = selectedDrink[key as keyof typeof ingredientsObj];
        if (value) {
          ingredients.push(value);
        }
      }
      setSelectedCocktailDetails(apiResponse[0]);
      setSelectedCocktailIngredients(ingredients);
    }
    setIsDetailsModalOpen(true);
  }

  const displaySelectedCocktailDetails = (id: string) => {
    fetchSelectedById(`${BASIC_URL}/lookup.php?i=${id}`, setSelectedData);
  };

  
  return (
    <div className={styles.cocktails_images}> 
     {props.data.map((drink) => (
        <LazyLoadImage
          key={drink.idDrink}
          src={drink.strDrinkThumb}
          alt="colored drink"
          className={styles.single_image}
          height={320}
          width={300}
          effect="blur"
          onClick={() => displaySelectedCocktailDetails(drink.idDrink)}
        />
    ))}

    {isLoading && (
       <Modal isModalOpen={isDetailsModalOpen} onCloseModal={handleCloseModal} className="selected_cocktail_loading">
          <div className={styles.selected_cocktail_loading}>
               <CircularProgress />
          </div>
       </Modal>
    )}

    {isDetailsModalOpen && !selectedCocktailDetails && (
      <Modal isModalOpen={isDetailsModalOpen} onCloseModal={handleCloseModal} className="selected_cocktail_error">
      <div className={styles.selected_cocktail_error}>
          <p>{ERROR_CALLING_API}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      </Modal>
    )}

    {isDetailsModalOpen && selectedCocktailDetails && (
        <SingleCocktail isDetailsModalOpen={isDetailsModalOpen} 
                        handleCloseModal={handleCloseModal}
                        selectedCocktailDetails={selectedCocktailDetails}
                        selectedCocktailIngredients={selectedCocktailIngredients}/>
    )}
    </div>
  );
};

export default Cocktails;
