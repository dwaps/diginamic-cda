import { Errors } from "../models/errors";
import { Todo } from "../models/todo";
import { ErrorDialogComponent } from "./error-dialog.component";
import "./form.component.scss";

/**
 * Classe dédiée à la gestion du formulaire d'ajout d'une tâche.
 */
export class FormComponent {
  private _addTodoInput = document.querySelector(
    ".add-todo input"
  ) as HTMLInputElement;
  private _addTodoButton = document.querySelector(
    ".add-todo button"
  ) as HTMLButtonElement;

  constructor() {
    this._addTodoInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        this._onSubmit();
      }
    });

    this._addTodoButton!.addEventListener("click", (e) => this._onSubmit());
  }

  /**
   * A la soumission du formulaire, si la tâche saisie est valide, cette méthode crée une tâche et réinitialise le champ de saisie.
   */
  private _onSubmit() {
    const userInput = this._addTodoInput!.value.trim();
    if (userInput.length > 3) {
      new Todo(userInput).render();
      this._addTodoInput!.value = "";
      this._addTodoInput!.focus();
    } else {
      new ErrorDialogComponent().show(Errors.INVALID);
    }
  }
}
