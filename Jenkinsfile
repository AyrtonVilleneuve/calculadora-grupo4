pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Sanity checks') {
      steps {
        // Windows-friendly (se o agente for Windows)
        bat 'dir'
        bat 'if exist index.html (echo OK) else (echo index.html NAO encontrado & exit /b 1)'
      }
    }
    stage('Archive') {
      steps {
        bat 'if not exist dist mkdir dist'
        bat 'powershell -Command "Copy-Item -Path * -Destination dist -Recurse"'
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }
  }
  post {
    always {
      echo 'Pipeline finalizado.'
    }
  }
}
