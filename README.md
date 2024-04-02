# Exercice CV HTML - [👤](https://dwaps.fr)

## Utilisation

Après installation des dépendances :

1. `npm run sass`
2. `npm start`

**Remarque:** Les dépendances utilisées sont minimales afin de respecter la consigne de l'exercice. A _Bootstrap_ et à _Sass_ j'ai juste ajouté _vite_ pour le lancement du projet sur un serveur de dev.

---

## Description

J'ai choisi de diviser le document en 3 sections (les 2 premières étant les principales parties du CV):

- `section.main-content`
- `section.side-content#profile`
- `section#contact`

### SECTIONS

La section `<section class="main-content">` contient elle-même 2 sous-sections (`experiences` et `formations`), et forme le contenu principal de la page (du point de vue graphique).

La section `<section class="side-content">` est disposée à gauche de la fenêtre lorsque la taille d'écran le permet. Sinon elle est reléguée au bas du site, avant le formulaire de contact.

### MENU

Le menu est dans le `<header>`de la page car il s'agit du menu principal. Chaque lien est une ancre vers les 4 identifiants représentées ci-dessous:

    section.main-content
    | --> section#experiences
    | --> section#formations
    section.side-content#profile
    section#contact

A noter que le lien vers `<section id="profile">` n'est affiché que lorsque la taille d'écran le rend indispensable.

### FONCTIONNALITES

Scripts en JS vanilla:

- Un bouton apparaît au besoin pour un retour en haut de page,
- Lors de la sélection d'un texte, il est possible de copier la sélection via un bouton `copy` ou de zoomer sur la sélection via un bouton `zoom`.
