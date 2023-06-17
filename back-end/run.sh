docker swarm init

docker stack rm rd2-chat

docker build -t rd2-chat-image -f Dockerfile .

# docker stack deploy -c docker/docker-compose.yml TERRY_BLOCKCHAIN