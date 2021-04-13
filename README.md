    - 테스트
    
        E2E.v2.test.js는 로컬에서 백엔드 서버와 프론트엔드 서버가 모두 실행되고 있을 때 테스트를 해야 함
        (localhost:5000 for frontend, localhost:3000 for backend)

    - 빌드와 배포

        AWS Codebuild를 사용하여 빌드와 배포를 하도록 구성되었고 scripts의 .sh에 있는 변수들은 AWS Codebuild console 등에서 Key/Value 형태로 지정해줘야 함
        빌드 전 (통합)테스트 실행 및 빌드 후 (통합)테스트 실행으로 구성

            변수

                $REGION
                $ACCESS_KEY
                $SECRET_KEY
                $DOCKER_ID
                $DOCKER_PASSWORD
                $IMAGE 
                $crtARN
                $app_image
                $BUCKET_NAME