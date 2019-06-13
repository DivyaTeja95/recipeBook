import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm, Form } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slForm: NgForm;
  ingredient: Ingredient;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.editIngredients.subscribe(
      (i: number) => {
        this.editMode = true;
        this.editedItemIndex = i;
        this.ingredient = this.shoppingListService.getIngredient(i);
        this.slForm.setValue({
          name:this.ingredient.name,
          amount:this.ingredient.amount
        });
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onAdd(f: NgForm){
    if(this.editMode){
      this.shoppingListService.editIngredient(new Ingredient(f.value.name, f.value.amount), this.editedItemIndex);
      this.editMode = false;
    }
    else{
      this.shoppingListService.onAddingIngredient(new Ingredient(f.value.name, f.value.amount));
    }

    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear;
  }
}
