import { ErrorDialogComponent } from "../components/error-dialog.component";
import { TodoComponent } from "../components/todo.component";
import { TodoService } from "../services/todo.service";
import { Errors } from "./errors";

/**
 * Classe modèle.d'une tâche.
 */
export class Todo {
  private static _todoService = TodoService.getInstance();

  public editable = false;

  constructor(public task: string, public done = false, public id?: string) {}

  /**
   * Demande la génération de la vue d'une tâche.
   * Si la tâche existe déjà en BDD, un message d'erreur apparaît.
   *
   * @param firstStart {boolean} Indique si la méthode est appelée suite au démarrage de l'application ou non
   */
  public async render(firstStart = false) {
    // Vérification des doublons
    if (
      !firstStart &&
      (await Todo._todoService.findAll()).find((t: Todo) => t.task == this.task)
    ) {
      new ErrorDialogComponent().show(Errors.EXISTS);
      return;
    }

    // Demande de génération de la vue de la tâche.
    try {
      if (!firstStart) {
        const created = await Todo._todoService.save(this);
        this.id = created.id;
      }
      new TodoComponent(this);
    } catch (e) {
      new ErrorDialogComponent().show(Errors.NOT_CREATED);
    }
  }
}
