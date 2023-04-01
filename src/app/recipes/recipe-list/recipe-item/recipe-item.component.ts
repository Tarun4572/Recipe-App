import { Component, Input} from '@angular/core';
import { Recipe } from '../../Recipe.model';
import { RecipeService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe:Recipe;
  @Input() index:number;
  // @Output() recipeSelected = new EventEmitter<void>(); moved to service

}
