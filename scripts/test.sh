serve -s ClientQ/build -l 5000 & 
echo -ne '\n'

docker run -d --name quest -p 3000:3000 $DOCKER_ID/$IMAGE 

npm run test # npx lerna run test

kill -9 `lsof -i:5000 | grep "node"|awk '{print $2}'`
docker stop quest
docker rmi $DOCKER_ID/$IMAGE

exit;