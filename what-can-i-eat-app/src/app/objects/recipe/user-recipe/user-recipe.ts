import { Ingredient } from "../../ingredient/ingredient"
import { PreparationStep } from "../../preparation-steps/preparation-step"

export interface UserRecipe {
    name: string,
    description: string,
    favorite: true,
    source: string,
    preptime: number,
    imageUrl: string,
    ingredients: Ingredient[],
    preparationSteps: PreparationStep[]
}

