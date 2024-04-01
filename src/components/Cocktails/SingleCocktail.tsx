import React from "react";
import Modal from "../../ui/Modal";
import styles from "./SingleCocktail.module.css";
import { SingleCocktailProps } from "../../assets/types";

const SingleCocktail = (props: SingleCocktailProps) => {
  return (
    <Modal isModalOpen={props.isDetailsModalOpen} onCloseModal={props.handleCloseModal} className="selected_cocktail_modal">
      <div className={styles.selected_cocktail}>
        <img src={props.selectedCocktailDetails.strDrinkThumb} alt="colored cocktail"/>
        <div>
          <h3>{props.selectedCocktailDetails.strDrink}</h3>
          <div>
            <label>id:</label>
            <span>{props.selectedCocktailDetails.idDrink}</span>
          </div>
          <div>
            <label>Ingredients:</label>
            <ul>
              {props.selectedCocktailIngredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <label>Instructions:</label>
            <span>{props.selectedCocktailDetails.strInstructions}</span>
          </div>
          <div className={styles.actions}>
            <button onClick={props.handleCloseModal}>Close</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SingleCocktail;
