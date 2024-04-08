import { Todo } from "../models/todo";

/**
 * Classe dédiée aux comunication avec le serveur d'api des tâches.
 * Cette classe est un singleton.
 */
export class TodoService {
  private static _instance: TodoService;
  private _baseUrl = "http://localhost:3000/todos";
  private _optionsHTTP = (method = "GET", obj = {}) => ({
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });

  private constructor() {}

  /**
   * S'assure qu'une seule instance de TodoService soit fournie.
   *
   * @returns L'instance du service
   */
  public static getInstance(): TodoService {
    if (!TodoService._instance) {
      TodoService._instance = new TodoService();
    }
    return TodoService._instance;
  }

  /**
   * Demande au serveur la liste de toutes les tâches de la BDD.
   *
   * @returns Retourne la promesse de l'ensemble des tâches.
   */
  public async findAll() {
    return fetch(this._baseUrl).then((res) => res.json());
  }

  /**
   * Demande au serveur de créer une tâche en BDD.
   *
   * @param todo {@link Todo} La tâche à sauvegarder.
   * @returns Retourne la promesse de la tâche sauvegardée.
   */
  public async save(todo: Todo) {
    return fetch(this._baseUrl, this._optionsHTTP("POST", todo)).then((res) =>
      res.json()
    );
  }

  /**
   * Demande au serveur le changement de l'état d'une tâche.
   *
   * @param todo {@link Todo} La tâche à mettre à jour
   * @returns Retourne la promesse de la tâche mise à jour.
   */
  public async toggleState(todo: Todo) {
    return fetch(
      this._baseUrl + "/" + todo?.id,
      this._optionsHTTP("PATCH", todo)
    ).then((res) => res.json());
  }

  /**
   * Demande au serveur de modifier une tâche.
   *
   * @param todo {@link Todo} La tâche à mettre à jour
   * @returns Retourne la promesse de la tâche mise à jour.
   */
  public async update(todo: Todo) {
    return fetch(
      this._baseUrl + "/" + todo.id,
      this._optionsHTTP("PUT", todo)
    ).then((res) => res.json());
  }

  /**
   * Demande au serveur de supprimer une tâche.
   *
   * @param todoId {string} L'identifiant de la tâche à supprimer.
   * @returns Retourne la promesse de la tâche supprimée.
   */
  public async delete(todoId?: string) {
    return fetch(
      this._baseUrl + "/" + todoId,
      this._optionsHTTP("DELETE")
    ).then((res) => res.json());
  }
}
