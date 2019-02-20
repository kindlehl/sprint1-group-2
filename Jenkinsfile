pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        githubNotify credentialsId: 'cs361-token', description: 'Jenkins build running', status: 'PENDING', targetUrl 'http://jenkins.hunterlannon.net'
        sh 'export JAVA_HOME=/usr/lib/jvm/java-11-openjdk && /usr/local/src/apache-maven/bin/mvn clean test'
      }
    }
  }
  post {
    unsuccessful {
      echo 'why is this not working'
      githubNotify credentialsId: 'cs361-token', description: 'Jenkins build failed', status: 'FAILURE', targetUrl 'http://jenkins.hunterlannon.net'
    }
    success {
      githubNotify credentialsId: 'cs361-token', description: 'Jenkins build passed', status: 'SUCCESS', targetUrl 'http://jenkins.hunterlannon.net'
    }
  }
}
