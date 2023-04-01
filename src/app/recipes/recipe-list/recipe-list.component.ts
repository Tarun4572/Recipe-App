import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../Recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  // @Output() recipeWasSelected = new EventEmitter<Recipe>(); // to recipe component

  recipes: Recipe[];
  subscription: Subscription;
  constructor(private recipeService:RecipeService, private router:Router, private route: ActivatedRoute){}



  ngOnInit(){
   this.subscription = this.recipeService.recipesChanged
    .subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    })
    this.recipes = this.recipeService.getRecipes();
  }


  // onRecipeSelected(recipe:Recipe)  used to be called from html file when recipe selected.
  // {
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
