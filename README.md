# Exercice CV HTML - [👤](https://dwaps.fr)

**Rappel de la consigne:**
Ecrire le code HTML d'une page CV sans utiliser les balises `<div>` et `<span>`, et en respectant les règles du RGAA.

PS: Il y a quelques endroits où j'aurais voulu utiliser une de ces 2 balises. Pour bien respecter la consigne de l'exercice, j'ai donc dû alléger un peu la structure que j'avais choisi au départ.

---

### Description

J'ai choisi de diviser le document en 3 sections (les 2 premières étant les principales parties du CV):

- `section.main-content`
- `section.side-content`
- `section#contact`

La première `<section>` contient elle-même 2 sous-sections (`experiences` et `formations`).

Le menu est dans le `<header>`de la page car il s'agit du menu principal. Chaque lien est une ancre vers les 4 identifiants représentées ci-dessous:

    section.main-content
    | --> section [id=experiences]
    | --> section [id=formations]
    section.side-content [id=profil]
    section [id=contact]

Concernant la partie **Coordonnées**, j'ai choisi d'utiliser la balise `<i>` pour respecter la consigne de l'exercice (pas de `<div` ni de `<span>`).

Concernant le **formulaire de contact**, j'ai choisi de le divisé en 2 parties pour mieux l'organiser.
