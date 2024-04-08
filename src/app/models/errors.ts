/**
 * Enumération des erreurs possibles de l'application.
 */
export enum Errors {
  INVALID = "Le texte doit contenir au minimum 4 caractères",
  EXISTS = "Cette tâche existe déjà !",
  NOT_CREATED = "La tâche n'a pas pu être crée...",
  NOT_DELETED = "La tâche n'a pas pu être supprimée...",
  NOT_UPDATED = "La tâche n'a pas pu être mise à jour...",
}
