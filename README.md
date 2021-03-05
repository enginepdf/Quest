    테스트의 경우
    cd ClientQ
    npm start 를 통해 로컬에서 클라이언트를 실행 중인 상태에서, Quest 디렉토리에서 npm run test(npm test를 통해 테스트)

    E2E.test.js만 테스트 시 문제 없음
    server.test.js만 테스트 시 문제 없음
    E2E.test.js와 server.test.js 테스트 시 문제 없음, client.test.js 포함하여 테스트 시 클라이언트 부분에서 fetch가 되지 않거나 테스트를 통과하는 부분에서도 이미 해당 서버 포트가 사용 중이라는 에러 메시지 뜸