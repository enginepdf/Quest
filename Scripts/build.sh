# Server build
docker build -t $DOCKER_ID/$IMAGE .
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
docker push $DOCKER_ID/$IMAGE
docker rmi $DOCKER_ID/$IMAGE

# ClientQ build
npx lerna run build