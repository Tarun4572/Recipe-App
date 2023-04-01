import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { dataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./Recipe.model";
import { RecipeService } from "./recipes.service";


export const RecipeResolver: ResolveFn<Recipe[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>{

    const recipes = inject(RecipeService).getRecipes();

    if(recipes.length === 0){
        return inject(dataStorageService).fetchRecipes();
    }else{
        return recipes;
    }

   
}