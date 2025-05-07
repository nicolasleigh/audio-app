.PHONY: docker/build
docker/build:
	@cd backend && sudo docker compose up --build && cd ..

.PHONY: docker/up
docker/up:
	@cd backend && sudo docker compose up -d && cd ..

.PHONY: android/build
android/build:
	@cd frontend && npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && cd android && ./gradlew assembleRelease && cd .. && cd ..
