import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService){}
    
  private recipes:Recipe[] = [
    new Recipe(
      'Burger', 
      'A tasty burger', 
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/5/10/0/FNM_060117-Smashburger-Style-Burgers-Recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1494459418304.jpeg',
      [new Ingredient('buns', 2), new Ingredient('meat', 1)] ),
    new Recipe(
      'Biryani', 
      'This is a famous indian dish', 
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/02/hyderabadi-biryani-recipe-500x500.jpg',
      [new Ingredient('rice', 2), new Ingredient('meat', 1)])
  ];

  getRecipes(){
      return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe{
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}