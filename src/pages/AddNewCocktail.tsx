import React, { useState } from "react";

import Input from "../ui/Input";
import Modal from '../ui/Modal';
import { NewCocktail } from "../assets/types";
import styles from "./AddNewCocktail.module.css";
import {ERROR_NAME,ERROR_INGREDIANTS,ERROR_INSTRUCTIONS,} from "../assets/constants";

const AddNewCocktail = () => {

  const [errorMsg, setErrorMsg] = useState("");
  const [imageFile, setImageFile] = useState<null | any>();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const checkFormValidation = (newCocktailData: NewCocktail) => {
    var regex = new RegExp("^[a-zA-Z,]*$");

    if (!newCocktailData.cocktailName) {
      return ERROR_NAME;
    }
    if (!newCocktailData.ingredients || !regex.test(newCocktailData.ingredients)) {
      return ERROR_INGREDIANTS;
    }
    if (!newCocktailData.instructions) {
      return ERROR_INSTRUCTIONS;
    }
    return "";
  };

  const handleSubmitForm = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newCocktailToAdd = Object.fromEntries(formData.entries()) as NewCocktail;

    const error = checkFormValidation(newCocktailToAdd);
    if (error) {
      setErrorMsg(error);
    } else {
      setErrorMsg("");
      newCocktailToAdd.file = imageFile;
      localStorage.setItem(newCocktailToAdd.cocktailName, JSON.stringify(newCocktailToAdd));
      setIsSuccessModalOpen(true);
    }
  };

  const uploadFile = (event: any) => {
    setImageFile(URL.createObjectURL(event.target.files[0]));
  };

  const onClearButton = () => {
    setImageFile(null);
    setErrorMsg("");
  };

  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
    window.location.reload();
  }

  return (
    <div className={styles.form_container}>
      <form id="new-cocktail-form" onSubmit={handleSubmitForm} className={styles.new_cocktail_form}>
        <div>
          <Input label="Cocktail name" id="cocktailName" type="text" />
          <Input label="Ingredients" id="ingredients" type="text" pattern="^[a-zA-Z,]*$"  title="only letters and commas are allowed"/>
          <Input label="Instructions" id="instructions" type="text" />
          <Input type="file" onChange={uploadFile} />
        </div>

        <div className={styles.error}>
          {errorMsg.length > 0 && <p>{errorMsg}</p>}
        </div>

        <div className={styles.actions}>
          <input type="reset" value="Clear" onClick={onClearButton} />
          <button type="submit">Add</button>
        </div>
      </form>
      {imageFile && (
        <img
          src={imageFile}
          alt="the uploaded file"
          className={styles.uploaded_img}
        />
      )}
      {isSuccessModalOpen && (
        <Modal isModalOpen={isSuccessModalOpen} onCloseModal={handleCloseModal} className="success_modal"> 
          <div className={styles.success_modal}>
            <p>Your request was submitted successfully</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </Modal>)
      }
    </div>
  );
};

export default AddNewCocktail;
