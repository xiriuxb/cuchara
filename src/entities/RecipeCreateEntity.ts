export interface RecipeCreateEntity {
    name: string;
    description?: string;
    portions: number;
    minutes: number;
    dificulty: number;
    process: string;
    ingredients: IngredientCreate[];
    image: File;
}

export interface IngredientCreate {
    id?: string;
    name: string;
    quantity: number;
    unit: number;
}