# tp72

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

Cette serveur est connecté aux services de TP4. Pour lancer les services de l'API:
https://github.com/cmonzonc/sir-tp4


## Structure 



## Testing

Running `grunt test` will run the unit tests with karma.

## Mèthodes implementes

### Méthode GET
Il permet de récupérer les informations des personnes dans le système Opower, pour cela une liste d'utilisateurs est récupérée (http: //localhost:8080/rest/person/) et lors de la sélection d'une personne une autre méthode GET est appelée (http://localhost:8080/rest/person/id/{:id})

![model3](https://github.com/cmonzonc/sir-tp6/blob/master/resources/tp6.png?raw=true)

### Méthode POST
Il permet d'insérer l'information d'une personne dans le système Opower, pour cela l'information est envoyé à la méthode POST (http: //localhost:8080/rest/person/). Une fois que l'information est procesée, l'application va recevoir une fichier JSON avec l'information de la personne insérée. 

![model3](https://github.com/cmonzonc/sir-tp6/blob/master/resources/tp6.png?raw=true)
