serve -s ClientQ/build -l 5000 &
echo -ne '\n'

docker run -d -p 3000:3000 $DOCKER_ID/$IMAGE
npm run test

kill -9 `lsof -i:5000 | grep "node"|awk '{print $2}'`
docker stop $DOCKER_ID/$IMAGE
docker rmi $DOCKER_ID/$IMAGE
exit;