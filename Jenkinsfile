pipeline {
    agent any

    stages {
        stage('Instalar dependências Node.js') {
            steps {
                echo 'Instalando dependências com npm install...'
                sh 'npm install'
            }
        }

        stage('Executar testes E2E com Cypress') {
            steps {
                echo 'Executando testes com Cypress...'
                sh 'npx cypress run'
            }
        }
    }

    post {
        always {
            echo 'Arquivando vídeos e screenshots...'
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
        }
        failure {
            echo 'Algum teste falhou.'
        }
    }
}
