pipeline{
    agent any
    stages {
        stage('Upload file to server') {
            steps {
                sh "echo uploading file to server"
                sh 'rsync -zhvr . ubuntu@3.219.167.108:/home/ubuntu/agritech/'
            }
        }
        stage('Install Packages') {
            steps {
                sh "echo Install Packages"
                sh 'ssh ubuntu@3.219.167.108 \'cd /home/ubuntu/agritech && npm i\''
            }
        }
        stage('Start Application') {
            steps {
                 sh "echo Start Application"
                 sh 'ssh -t ubuntu@3.219.167.108 "cd /home/ubuntu/agritech/ && pm2 restart index.js"'  
            }
        }    
    }
}