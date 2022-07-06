
# Commandes docker-compose

## Vérifier la configuration docker-compose

`docker compose config`

## Créer le container

`docker compose create`

## Démarrer tous les containers en background

`docker compose up -d`

## Démarrer un seul container en background

`docker compose up -d <service>`

Exemple : 
`docker compose up -d mysql`

## Voir les logs d'un container

`docker compose logs <service>`

OU

`docker compose logs -f <service>`

(-f permet de voir les logs en continu)

## Voir le statut des containers

`docker compose ps`

## Arrêter lee containers

`docker compose stop`

## Supprimer les containers (et les données !)

`docker compose down -v`
