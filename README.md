# Patch Live

Appli de dossiers techniques de tournée / one shot live : master patch, sorties, distribution HF (Spectera), boîtiers, racks et I/O, liste matériel, plan de scène, journal.

**Adresse : https://eddy-lav.github.io/patch-live/**

- Fonctionne dans le navigateur sur PC, Mac, iPhone et Android (Chrome, Edge, Safari, Firefox). Installable comme une appli (Chrome/Edge : bouton « Installer » ; iPhone : Partager › Sur l'écran d'accueil).
- Les dossiers sont des fichiers .xlsx rangés dans Dropbox, lisibles aussi dans Excel.
- Travail à plusieurs : chacun se connecte avec son propre compte Dropbox. L'appli enregistre automatiquement, est prévenue quand un collègue enregistre et fusionne les modifs ligne par ligne. Si la même valeur est changée des deux côtés, la sienne est gardée et l'autre est proposée.
- Hors ligne : les modifs attendent et sont fusionnées au retour du réseau.

## Construire

`src/patch-live.html` est la source unique. Pour régénérer le site à la racine :

```sh
sh src/build/build.sh src/patch-live.html . <clé d'appli Dropbox>
```

La clé d'appli Dropbox est publique (connexion OAuth PKCE, sans secret).
