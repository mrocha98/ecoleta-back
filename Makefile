include .env

.PHONY: up

up:
	docker-compose up -d

.PHONY: down

logs:
	docker-compose logs -f

.PHONY: down

stop:
	docker-compose stop
