### Pré-requis ###

### Afficher l'appli dans un navigateur ###

Il y a quelques points a effectuer pour afficher l'appli dans un navigateur afin de debuguer.

#### Ajouter un proxy ###

Afin d'éviter un problème lié aux CORS, il faut passer par un proxy pour faire les requêtes REST au serveur wordpress.

Pour installer le proxy, procéder comme suit

- Le fichier `ionic.project` doit contenir une redirection de proxy comme ceci :
```
{
  "name": "gront",
  "app_id": "",
  "proxies": [
    {
      "path": "/rest-api",
      "proxyUrl": "https://gront.fr/"
    }
  ]
}
```

- Les initialisation des modules REST doivent utiliser le proxy.
Dans le fichier `www/js/model/bdd.js`, modifier l'attribut `url` et ajouter l'attribut `proxy` dans l'initialisation de l'objet `WooCommerceAPI`

```
url: 'http://localhost:8100/rest-api',
proxy: 'http://gront.fr/'
```
