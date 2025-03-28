# boostr-automation
Test automation for Boostr application

_**Setup:**_

To run boostr test automation cases we need to setup all below mentioned services locally

_**Start Migrator:**_

Clone Migrator repo(Develop)

_Commands:_

        export MYSQL_DATABASE=chifupartners_test
        
        export MYSQL_USER=user
        
        export MYSQL_PASSWORD=pwd
        
        export MYSQL_ROOT_PASSWORD=pwd
        
        export RAILS_ENV=test
        
        export TEST_UNAME=root
        
        export TEST_HOST=db
        
        export TEST_PWD=pwd
        
        export DOCKER_BUILDKIT=1
        
        docker network create velynk-network
        
        docker compose -f docker-compose-test.yml up -d db
        
        docker compose -f docker-compose-test.yml up -d migrator

_**Start backend:**_

Clone Velynk Backend branch(Develop)

_Commands:_
        
        export AWS_ACCESS_KEY_ID="****" <!-- Get ID from authorized person -->
        
        export AWS_SECRET_ACCESS_KEY="****" <!-- Get Key from authorized person -->
        
        export AWS_DEFAULT_REGION=ap-south-1
        
        export AWS_DEFAULT_OUTPUT=json
        
       aws ecr get-login-password --profile default --region ap-south-1 | docker login --username AWS --password-stdin 107389626891.dkr.ecr.ap-south-1.amazonaws.com
        
        export MYSQL_DATABASE=chifupartners_test
        
        export MYSQL_USER=user
        
        export MYSQL_PASSWORD=pwd
        
        export MYSQL_ROOT_PASSWORD=pwd
        
        export RAILS_ENV=test
        
        export TEST_UNAME=root
        
        export TEST_HOST=db  
        
        export TEST_PWD=pwd
        
        export TRESTLE_LOGIN=vegrow
        
        export TRESTLE_PWD=WorldsBigFarmer
        
        export INTUGENE_USER_NAME=vegrow_api_test
        
        export INTUGENE_PASSWORD=vgrow_api_test@123

        export AWS_S3_KYC_BUCKET='test-kyc-bucket'
        
        export DOCKER_BUILDKIT=1

        export GOOGLE_OMINIAUTH_CLIENT_ID= *** <!-- Get ID from authorized person. Needed only for B2R Automation-->
        
        export GOOGLE_OMINIAUTH_CLIENT_SECRET= *** <!-- Get secret from authorized person. Needed only for B2R Automation-->
        
        export GOOGLE_MAPS_KEY= "***" <!-- Get key from authorized person. Needed only for B2R Automation-->
        
        export URL_ENCRYPTION_KEY= "***" <!-- Get key from authorized person. Needed only for B2R Automation-->
        
        docker-compose -f docker-compose-test.yml up

_**Start velynk frontend:**_

clone Velynk Frontend branch(Develop)

_Commands:_

         export APP_ENV=development
         
         export PORT=9001
         
         yarn start

_**Start B2R frontend:**_

Clone b2r-frontend (develop)

_Commands:_

       export APP_ENV=development
       
       yarn start

_**Start OTP service:**_

Clone OTP service repo(test_automation branch)

_Commands:_

        export ENV=test
        
        export VELYNK_HOST=http://localhost:3000
        
        export OTP_SERVICE_PORT=6877
        
        export EXT_UNAME=user
        
        export EXT_PWD=pwd
        
        export EXT_HOST=localhost
        
        export EXT_DATABASE=chifupartners_test
        
        export MYSQL_POOL_SIZE=5
        
        go run delivery/restapplication/main.go

_**Run Automation Testcases:**_

Clone boostr-automation repo(master)

_Commands:_

       npm install cypress
       npx cypress run or npx cypress open
       Some examples:
       npx cypress run --record --key a74ec272-1d06-4292-99d4-ab56d368ea6b --spec "cypress/e2e/Qaautomation/boostr/" --browser chrome
       npx cypress run --record --key a74ec272-1d06-4292-99d4-ab56d368ea6b --spec "cypress/e2e/Qaautomation/KAM_Order_Flow/" --browser chrome
