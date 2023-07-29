import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Recipe } from 'src/app/model/recipe/recipe';
import { RecipeItemOnClickComponent } from '../recipe-item-on-click/recipe-item-on-click.component';
import { RecipeService } from 'src/app/objects/recipe/recipe.service';
import { filter, concatMap } from 'rxjs';
import { DialogConfirmationComponent } from 'src/app/common/dialog/dialog-confirmation/dialog-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarSuccessComponent } from 'src/app/common/dialog/snackbar-success/snackbar-success.component';

@Component({
  selector: 'app-recipe-item-card',
  templateUrl: './recipe-item-card.component.html',
  styleUrls: ['./recipe-item-card.component.scss']
})
export class RecipeItemCardComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Output() public delete = new EventEmitter<Recipe>();

  constructor(
    private dialog: MatDialog,
    private recipeService: RecipeService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onRecipeCardClick(): void {
    const dialogRef = this.dialog.open(RecipeItemOnClickComponent)
  }

  deleteRecipe(): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, { 
      data: { 
        objectType: "recipe",
        objectName: this.recipe.name
      }
    });
    
    dialogRef.afterClosed()
    .pipe(
        filter((val) => val === true),
        concatMap(() => { return this.recipeService.deleteRecipe(this.recipe)})
    ).subscribe({
      next: (val) => {
        this.delete.emit();
        this.openSnackbarSuccess(this.recipe);
      },
      error: () => console.log("error")
    })
  }

  private openSnackbarSuccess(recipe: Recipe): void {
    this._snackBar.openFromComponent(SnackbarSuccessComponent, {
      data: {
        message: `Recipe ${recipe.name} has been deleted!`
      }
    });
  }

  public toggleFavorite(): void {
    this.recipe.favorite ? this.recipe.favorite = false : this.recipe.favorite = true;
    this.recipeService.modifyRecipe(this.recipe).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
      },
      error: () => {
        console.log("Something went wrong");
      }
    })
  }
}