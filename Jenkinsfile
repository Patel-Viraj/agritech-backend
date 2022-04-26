pipeline{
    agent any
    stages {
        stage('Upload file to server') {
            steps {
                sh "echo uploading file to server"
                sh 'rsync -zhvr . ubuntu@$DEPLOY_IP:/home/ubuntu/agritech/'
            }
        }
        stage('Install Packages') {
            steps {
                sh "echo Install Packages"
                sh 'ssh ubuntu@$DEPLOY_IP \'cd /home/ubuntu/agritech && npm i\''
            }
        }
        stage('Start Application') {
            steps {
                 sh "echo Start Application"
                 sh 'ssh ubuntu@$DEPLOY_IP "cd /home/ubuntu/agritech/ && pm2 restart index.js"'  
            }
        }    
    }
}