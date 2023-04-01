import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./Recipe.model";

@Injectable()
export class RecipeService{
    
  recipesChanged = new Subject<Recipe[]>();

  //  private recipes: Recipe[]private recipes: Recipe[] = [
  //       new Recipe('A Test Recipe',
  //       'This is simply a test', 
  //       'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
  //       [
  //         new Ingredient('Meat', 1),
  //         new Ingredient('Fries', 20)
  //       ]),
  //     ];

  private recipes: Recipe[] = [];

    // recipeSelected = new Subject<Recipe>();
    
    constructor(private shoppingListService:ShoppingListService){}


    // to get recipes
    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(id:number){
      return this.recipes[id];
  }

    addIngredientsToShoppingList(ingredients : Ingredient[]){
      this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, recipe:Recipe){
      this.recipes[index] = recipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
      this.recipes.splice(index,1);
      this.recipesChanged.next(this.recipes.slice());

    }

    setRecipes(recipes:Recipe[]){
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

}