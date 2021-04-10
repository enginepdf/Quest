# Server build

cd Server
docker build -t $DOCKER_ID/$IMAGE .
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
docker push $DOCKER_ID/$IMAGE
cd ..

# ClientQ build

npx lerna run build # cd ClientQ; npm run build; cd ..
exit;