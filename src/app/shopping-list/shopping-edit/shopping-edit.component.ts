import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    // @ViewChild('nameInput') nameInputRef:ElementRef;       //  initially using viewchild by accessing nativelement.value
    // @ViewChild('amountInput') amountInputRef:ElementRef;

    // @Output() ingredientAdded = new EventEmitter<Ingredient>(); done using service


    @ViewChild('f',{static:false}) slForm:NgForm;
    subscription:Subscription;
    editMode:boolean = false;
    editedItemIndex:number;
    editedItem:Ingredient;
    constructor(private shoppingListService:ShoppingListService){}


    ngOnInit(): void {
      this.subscription = this.shoppingListService.startedEditing.subscribe((index:number)=>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      })
    }

    onAddItem(form:NgForm)
    {
      const value = form.value;
      const ingredient = new Ingredient(value.name, value.amount);

      if(this.editMode){
        this.shoppingListService.updateIngredient(this.editedItemIndex,ingredient);
      }
      else{
        this.shoppingListService.addIngredient(ingredient);
      }
      
      this.editMode = false;
      form.reset();
      
    }

    onClear(){
      this.slForm.reset();
      this.editMode = false;
    }

    onDelete(){
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }

    ngOnDestroy(): void {
     this.subscription.unsubscribe();
    }
}
