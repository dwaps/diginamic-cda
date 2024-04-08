import { FormComponent } from "./components/form.component";
import { TodoComponent } from "./components/todo.component";

/**
 * Classe dédiée à l'application.
 */
export class App {
  /**
   * Permet de démarrer l'application.
   * Elle récupère la listes de tâches sauvegardées en BDD et démarre la gestion du formulaire d'ajout d'une tâche.
   */
  static run() {
    TodoComponent.initTodoList();
    new FormComponent();
  }
}
