# IoT Weather Station - ISEN LILLE 2020

ESPARSA Noé - SUBAYROLE Alexis - BRIQUET Thomas

## Présentation du projet

   Ce projet avait pour but de mettre en place une mini station météo étant en mesure de récupérer des données météorologiques telle que la température et l'humidité d'une pièce. Une fois ces données récupérées nous devions être en mesure de les afficher sur une page web réaliser par nos soins.
Pour le coté hardware nous avons utilisé un ESP866 ainsi qu'un capteur d'humidité et de température DHT11.

## Choix techniques 

* Tout d'abord pour le transfert des données entre la partie Hardware et Software nous avions opté pour un communication via le système **SIgFox** cependant nous avons rencontré des problèmes sur a transmission des mesage et nous avons finalement opté pour la communication via **WiFi** qui s'est avéré nettement plus simple à mettre en place.

* Nous avons ensuite utilisé **ThingSpeak.com** permetant d'héberger toutes les données récupérées par notre capteur. Celles-ci sont accessibles à n'importe qu'elle endroit tant qu'une connexion wifi est disponnible. Nous avons mis en place sur cette plateforme un historiques des données à l'aide d'un graphique ainsi qu'une vision en temps réelle des données captées.

* Pour ce qui est de la gestion de projet nous avons divisé ce projet en 3 parties distinctes :
    * Une partie hardware et Arduino ( Noé ).
    * Une partie gestion de la base de donnée ( Thomas ).
    * Une partie affichage web ( Alexis ).

## Comment utiliser notre projet

1. Ouvrir le projet Arduino disponnible dans le github intitulé **weather_station.io**.
2. Sur l'IDE Arduino importé les librairies **DHT** et **ESP8266WiFi**.
3. Renseigner le nom du réseau WiFi sur lequel la carte se connectera ainsi que son mot de passe.
4. Alimenter la carte nodeMCU et lancer le programme (Les données captées peuvent être visualiser directement depuis le port série).
5. Se rendre sur [ThingSpeak](https://thingspeak.com/login) et se connecter :
   * ID : noe.esparsa@isen.yncrea.fr
   * MDP : ProjetIoT2020
6. Une fois connécté, dans l'onglet **My Channel** cliquer sur **Humidity and Temperature** permettant de visualiser les données renvoyées par le capteur en temps réél ainsi que l'historique.

