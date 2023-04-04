import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { pipe } from "rxjs";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { RecipeService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({ providedIn: 'root' })
export class dataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }


    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        console.log(recipes);
        return this.http.put('https://recipe-backend-44c0f-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe((response) => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
            'https://recipe-backend-44c0f-default-rtdb.firebaseio.com/recipes.json',
        ).pipe(map(recipes => {
            return recipes.map(recipes => {
                return { ...recipes, ingredients: recipes.ingredients ? recipes.ingredients : [] };
            });
        }), tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
        )
    }
}