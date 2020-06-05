include .env

.PHONY: up

up:
	docker-compose up -d

.PHONY: logs

logs:
	docker-compose logs -f

.PHONY: stop

stop:
	docker-compose stop
