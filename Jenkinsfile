pipeline {
    agent any

    stages {
        stage('Instalar dependências Node.js') {
            steps {
                echo 'Instalando dependências com npm install...'
                bat 'npm install'
            }
        }

        stage('Executar testes E2E com Cypress') {
            steps {
                echo 'Executando testes Cypress...'
                bat 'npx cypress run'
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }

    post {
        always {
            echo 'Arquivando vídeos e screenshots...'
            archiveArtifacts artifacts: '**/cypress/videos/**', allowEmptyArchive: true
            archiveArtifacts artifacts: '**/cypress/screenshots/**', allowEmptyArchive: true
        }

        failure {
            echo 'Algum teste falhou.'
        }
    }
}
