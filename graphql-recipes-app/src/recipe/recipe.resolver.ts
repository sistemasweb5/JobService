import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Recipe } from './recipe.model';

@Resolver(of => Recipe)
export class RecipeResolver {
  private recipes: Recipe[] = [];

  // Consulta para obtener todas las recetas
  @Query(returns => [Recipe])
  getRecipes(): Recipe[] {
    return this.recipes;
  }

  // Mutación para agregar una nueva receta
  @Mutation(returns => Recipe)
  addRecipe(
    @Args('title') title: string,
    @Args('description') description: string,
  ): Recipe {
    const newRecipe: Recipe = { id: this.recipes.length + 1, title, description };
    this.recipes.push(newRecipe);
    return newRecipe;
  }

  // Mutación para actualizar una receta existente
  @Mutation(returns => Recipe, { nullable: true })
  updateRecipe(
    @Args('id') id: number,
    @Args('title') title: string,
    @Args('description') description: string,
  ): Recipe | null {
    const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
    if (recipeIndex === -1) {
      return null; // Si no se encuentra la receta
    }
    const updatedRecipe = { ...this.recipes[recipeIndex], title, description };
    this.recipes[recipeIndex] = updatedRecipe;
    return updatedRecipe;
  }

  // Mutación para eliminar una receta existente
  @Mutation(returns => Boolean)
  deleteRecipe(@Args('id') id: number): boolean {
    const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
    if (recipeIndex === -1) {
      return false; // Si no se encuentra la receta
    }
    this.recipes.splice(recipeIndex, 1); // Eliminar la receta
    return true; // Retornar verdadero si se eliminó
  }
}
