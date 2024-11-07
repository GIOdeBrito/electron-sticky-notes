docker-compose build

docker-compose up -d

docker cp electron-sticky-notes-container:/app/dist .

docker-compose down

chmod 777 dist

# rm -r dist/