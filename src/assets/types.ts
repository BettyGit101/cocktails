export type ApplyData = (data?: any) => void;

export type BasicDrink = {
  idDrink: string,
  strDrink: string
  strDrinkThumb: string
}

export type ModalProps = {
  children:any,
  isModalOpen: boolean,
  onCloseModal: () => void,
  className:string
}

export type SelectedCocktail = {
  idDrink: string,
  strDrink: string,
  strCategory: string,
  strInstructions: string,
  strDrinkThumb: string,
  strIngredient1: string | null,
  strIngredient2: string | null,
  strIngredient3: string | null,
  strIngredient4: string | null,
  strIngredient5: string | null,
  strIngredient6: string | null,
  strIngredient7: string | null,
  strIngredient8: string | null,
  strIngredient9: string | null,
  strIngredient10: string | null,
  strIngredient11: string | null,
  strIngredient12: string | null,
  strIngredient13: string | null,
  strIngredient14: string | null,
  strIngredient15: string | null
}


export type SingleCocktailProps = {
  isDetailsModalOpen: boolean,
  handleCloseModal: () => void,
  selectedCocktailDetails: SelectedCocktail,
  selectedCocktailIngredients: string[]
}

export type InputProps = {
  label?:string,
  id?: string,
  type: string,
  min?:string,
  max?:string,
  value?:string,
  placeholder?:string,
  pattern?: string,
  title?:string,
  className?:string,
  onChange?: (e:any) => void
}

export type NewCocktail = {
  cocktailName:string,
  ingredients:string,
  instructions:string,
  file?:any
}

export type SearchProps = {
  setApiSearchedData: (data:any) => void
}