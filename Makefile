.PHONY: docker/build
docker/build:
	@cd backend && sudo docker compose up --build && cd ..

.PHONY: docker/up
docker/up:
	@cd backend && sudo docker compose up -d && cd ..