pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "sidhigoel"
        BACKEND_IMAGE  = "sidhigoel/diary-backend"
        FRONTEND_IMAGE = "sidhigoel/diary-frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📂 Code ready hai...'
                sh 'ls /home/ubuntu/diary-app/'
            }
        }

        stage('Build Backend') {
            steps {
                echo '🔧 Backend image build ho rahi hai...'
                sh '''
                    docker build -t sidhigoel/diary-backend:${BUILD_NUMBER} /home/ubuntu/diary-app/backend
                    docker tag sidhigoel/diary-backend:${BUILD_NUMBER} sidhigoel/diary-backend:latest
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                echo '🎨 Frontend image build ho rahi hai...'
                sh '''
                    docker build -t sidhigoel/diary-frontend:${BUILD_NUMBER} /home/ubuntu/diary-app/frontend
                    docker tag sidhigoel/diary-frontend:${BUILD_NUMBER} sidhigoel/diary-frontend:latest
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo '☁️ Docker Hub pe push ho raha hai...'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push sidhigoel/diary-backend:${BUILD_NUMBER}
                        docker push sidhigoel/diary-backend:latest
                        docker push sidhigoel/diary-frontend:${BUILD_NUMBER}
                        docker push sidhigoel/diary-frontend:latest
                    '''
                }
            }
        }

        stage('Deploy App') {
            steps {
                echo '🚀 App deploy ho rahi hai...'
                sh '''
                    cd /home/ubuntu/diary-app
                    docker-compose down
                    docker-compose up -d --build
                '''
                echo '✅ App live hai http://52.66.23.220:80 pe!'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline kaamyab! Diary app live hai!'
        }
        failure {
            echo '❌ Kuch galat hua — Console Output dekho!'
        }
    }
}
