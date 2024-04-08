# Exercice TODOLIST - [👤](https://dwaps.fr)

### Commandes pour tester le projet

- `npm start` > Lance le serveur d'api et l'application en parallèle.
- `npm run start:reset:db` > Idem, mais en nettoyant la BDD.
- `npm run doc` > Génère la documentation dans le dossier `doc/`.

### Structure du projet

La structure que j'ai choisie s'inspire de celle d'un projet avec Angular simple.

```txt
src/index.ts > Point d'entrée
src/app/components > Classes dédiées à la vue
src/app/models > Classe Todo et enumération Errors
src/app/services > TodoService
```

### Explication pour la transpilation

Un fichier `tsconfig.json` permet de configurer TypeScript.

Celui-ci contient les clés suivantes:

- **include** - Indique à TS de suivre tout les fichiers `.ts` du dossier `src/`
- **target** - Le code TS doit être compilé en ES6
- **module** - Le partage des modules utilise le standard ESNext
- **strict** - Active une série d'options pour ajouter des contraintes de codage
- **moEmitOnError** - Empêche la transpilation en cas d'erreur TS

Dans ce projet, [Typescript](https://www.typescriptlang.org/) est installé en local dans le projet et la cli (`./node_modules/.bin/tsc`) est gérée par [Webpack](https://webpack.js.org/) gère la transpilation du code TS.

### Gestion des erreurs

A chaque erreur, une boîte de dialogue est présentée à l'utilisateur qui pourra la fermer en utilisant la touche `echap` ou en cliquant sur la croix, en haut à droite de la boîte.

Une erreur est lancée:

- Si l'utilisateur soumet une tâche qui ne comporte pas assez de caractères,
- Si la tâche soumise existe déjà en BDD (doublon),
- Si le serveur est en erreur (création, suppression ou mise à jour de la tâche impossible)
