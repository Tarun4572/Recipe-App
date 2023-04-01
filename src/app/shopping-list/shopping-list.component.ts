import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
    ingredients:Ingredient[];
    
    private igChangedSub:Subscription;
   constructor(private shoppingListService: ShoppingListService){}



  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
   this.igChangedSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients;
      }
    );
  }

  // onIngredientAdded(ingredient:Ingredient) moved to service
  // {
  //   this.ingredients.push(ingredient); 
  // }



  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
   this.igChangedSub.unsubscribe();
  }




}
