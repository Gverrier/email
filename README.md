###  Link to fork on Bitbucket

https://github.com/Gverrier/email


### Install

With NPM & Bower dependencies

    npm install && bower install

### Launch

Once create, launch command: 

	gulp
	
And watch project

### Flux MailsApp

> An application architecture for React utilizing a unidirectional data flow with Flux Architecture

Stacks:

+ Use JSX on Render
+ [NPM](https://www.npmjs.com/) & [BOWER](https://bower.io/)
+ AJAX
+ Animations effets
+ Undescore.js
+ List item
+ [Flux](https://facebook.github.io/flux/docs/todo-list.html)


![enter image description here](http://blog.soat.fr/wp-content/uploads/2016/04/flux-diagram-white-background-768x383.png)


Pourquoi Flux avec ReactJS ?
----------------------------

[http://tech.m6web.fr/isomorphic-single-page-app-parfaite-react-flux/](http://tech.m6web.fr/isomorphic-single-page-app-parfaite-react-flux/)

##Mecanisme

#### Les Actions

*En rouge sur le schéma.*
Dans une architecture Flux, tout passe par les actions.
On ne peut pas modifier l’affichage d’un composant ou *déclencher un comportement sans action*.
C’est à partir d’une action qu’on pourra *modifier le state d’un composant* React par exemple.

Si le code de l’action est complexe, on peut séparer sa création et l’instance elle-même (ce qui explique les deux briques du schéma).
 C’est dans ce composant qu’on s’interfacera avec des **API externes à l’architecture Flux**.
 Typiquement, les actions sont déclenchées par un **clic dans une *GUI***, ou bien peuvent provenir du serveur via  *websocket* par exemple.

#### Le dispatcher

*En noir sur le schéma.*
Le dispatcher est *le composant unique* qui reçoit toutes les actions de l’application.
Son rôle est de notifier tous *les stores* via des callbacks que l’action a eu lieu.

#### Les stores

*En marron sur le schéma.*

Les stores sont *les composants de Flux* qui vont contenir et **gérer les states de l’application**.
Ils fournissent au dispatcher **les callbaks exécutés** lors de la notification d’une action.

Il va donc contenir **l’implémentation de toutes les règles de gestions** du domaine qu’il couvre. Il va également gerer les actions qu’il veut traiter, car comme expliqué ci-dessus, le dispatcher notifie les stores de toutes les actions de l’application.
Chaque store s’occupera d’une partie du fonctionnel de l’application et ne voudra donc pas traiter toutes les actions. Pour finir, les stores vont notifier par événement les changements d’état aux vues leur correspondant.

#### Les vues

En bleu sur le schéma.
Les vues sont chargées d’afficher le state contenu dans le store associé.
Elles s’enregistrent auprès du store pour être notifiées des changements **de state**, pour se mettre à jour en conséquence.
