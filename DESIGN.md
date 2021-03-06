
## Structure 
1. /app: Dossier ou se trouve l'application, il contient les scripts, les styles et le views.
- Scripts: 
app.js (Controleur principal ou le reste de controlleurs sont definis)
main.js (Controleur pour lancer les commandes GET)
about.js (Controleur pour lancer la commande POST)
- Views
main.html: Vue liée au controleur main.js
about.html: Vue liée au controleur about.js
2. Gruntfile.js
3. bower_components
4. node_modules

## Mèthodes implementées

### Méthode GET
Il permet de récupérer les informations des personnes dans le système Opower, pour cela une liste de personnes est récupérée (http://localhost:8080/rest/person) et lors de la sélection d'une personne une autre méthode GET est appelée (http://localhost:8080/rest/person/id/{:id}) pour montre la information de la personne selectionnée. 

![model3](https://github.com/cmonzonc/sir-tp7/blob/master/resources/get.png?raw=true)

### Méthode POST
Il permet d'insérer l'information d'une personne dans le système Opower, pour cela l'information est envoyé à la méthode POST (http://localhost:8080/rest/person/). Une fois l'information a été enregistrée le serveur Yeoman lance une réponse en format JSON contenant l'information de la personne enregistrée (ID).

![model3](https://github.com/cmonzonc/sir-tp7/blob/master/resources/post.png?raw=true)
