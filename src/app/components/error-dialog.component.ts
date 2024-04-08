/**
 * Classe dédiée à la gestion de la boîte de dialogue des erreurs.
 */
export class ErrorDialogComponent {
  private _errorDialog = document.querySelector(".error") as HTMLDialogElement;
  private _errorTxtTag = document.querySelector(
    ".error p"
  ) as HTMLDialogElement;
  private _errorBtnClose = document.querySelector(
    ".error .close"
  ) as HTMLDialogElement;

  constructor() {
    this._errorBtnClose.addEventListener("click", () => {
      this.close();
    });
  }

  /**
   * Cette méthode lance l'affichage de la boîte de dialogue.
   *
   * @param txt {string} Texte de l'erreur à afficher
   */
  public show(txt: string) {
    this._errorTxtTag.innerText = txt;
    this._errorDialog.showModal();
  }

  /**
   * Cette méthode ferme la boîte de dialogue.
   */
  public close() {
    this._errorTxtTag.innerText = "";
    this._errorDialog.close();
  }
}
