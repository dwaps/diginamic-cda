import { Errors } from "../models/errors";
import { Todo } from "../models/todo";
import { TodoService } from "../services/todo.service";
import { ErrorDialogComponent } from "./error-dialog.component";
import "./todo.component.scss";

/**
 * Classe dédiée à la vue d'une ou des tâches.
 */
export class TodoComponent {
  private static _todoService = TodoService.getInstance();
  private static _todosContainer = document.querySelector(
    ".todos"
  ) as HTMLDivElement;

  public html!: HTMLElement;
  public taskTag!: HTMLParagraphElement;
  public iconEditTag!: HTMLElement;

  constructor(private _todo: Todo) {
    this._init();
  }

  /**
   * Génère la vue d'une tâche dans la page web (dans la `<div class="todos"></div>`).
   */
  private _init() {
    this.html = document.createElement("section");
    this.html = document.createElement("div");
    this.html.className = "todo";

    this.taskTag = document.createElement("p");
    this.taskTag.className = this._todo.done ? "done" : "";
    this.taskTag.innerText = this._todo.task;
    this.html.appendChild(this.taskTag);

    this._buildButtonsBar();

    TodoComponent._todosContainer.appendChild(this.html);
  }

  /**
   * Méthode statique permettant la génération de la vue pour toutes les tâches stockées en BDD.
   */
  public static async initTodoList() {
    const todos = await this._todoService.findAll();
    todos.forEach(({ id, task, done }: Todo) =>
      new Todo(task, done, id).render(true)
    );
  }

  /**
   * Change l'état fait/pas fait d'une tâche, et répercute la modification sur la vue.
   */
  public async toggleStateOfTodo() {
    this._todo.done = !this._todo.done;
    if (this._todo.done) this.taskTag.classList.add("done");
    else this.taskTag.classList.remove("done");
    TodoComponent._todoService.toggleState(this._todo);
  }

  /**
   * Demande la suppresion d'une tâche et supprime la tâche de la vue en cas de succès.
   * En cas d'erreur, cette méthode lance une boîte de dialogue avec le message d'erreur correspondant.
   *
   * TODO: Gérer l'erreur...
   */
  public async deleteTodo() {
    try {
      await TodoComponent._todoService.delete(this._todo.id);
      this.html.remove();
    } catch (e) {
      new ErrorDialogComponent().show(Errors.NOT_DELETED);
    }
  }

  /**
   * Demande la mise à jour d'une tâche et modifie la vue en cas de succès.
   * Au premier appel, cette méthode modifie la vue pour donner la possibilité à l'utilisateur de saisir la modification.
   * Au second appel, elle demande la modification au service concerné.
   *
   * En cas d'erreur, cette méthode lance une boîte de dialogue avec le message d'erreur correspondant.
   */
  public async updateTodo() {
    this._todo.editable = !this._todo.editable;
    if (this._todo.editable) {
      this.iconEditTag.className = "icon-save";
      this.taskTag.contentEditable = "true";
      this.taskTag.focus();
    } else {
      this.iconEditTag.className = "icon-edit";
      this.taskTag.removeAttribute("contenteditable");
      const oldValue = this._todo.task;
      this._todo.task = this.taskTag.innerText;
      try {
        await TodoComponent._todoService.update(this._todo);
        this.html;
      } catch (e) {
        this.taskTag.innerText = oldValue;
        new ErrorDialogComponent().show(Errors.NOT_UPDATED);
      }
    }
  }

  /**
   * Permet de construire et de configurer les boutons d'une tâche.
   * Génère la vue correspondante.
   */
  private _buildButtonsBar() {
    const buttonsBar = document.createElement("div");
    const btDone = document.createElement("button");
    const btEdit = document.createElement("button");
    const btDelete = document.createElement("button");
    this.iconEditTag = document.createElement("i");

    buttonsBar.className = "buttons-bar";
    btDone.className = "done";
    btEdit.className = "edit";
    this.iconEditTag.className = "icon-edit";
    btDelete.className = "remove";

    btDone.innerHTML = '<i class="icon-done"></i>';
    btEdit.appendChild(this.iconEditTag);
    btDelete.innerHTML = '<i class="icon-remove"></i>';

    buttonsBar.appendChild(btDone);
    buttonsBar.appendChild(btEdit);
    buttonsBar.appendChild(btDelete);

    btDelete.addEventListener("click", () => this.deleteTodo());
    btDone.addEventListener("click", () => this.toggleStateOfTodo());
    btEdit.addEventListener("click", () => this.updateTodo());

    this.html.appendChild(buttonsBar);
  }
}
