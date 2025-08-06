pipeline {
    agent {label 'agent2'} 
    stages {
        stage('Deploy') {
            steps {
                script {
                    sshagent(['doop-staging']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no root@160.30.136.119 'cd Project/vamedi && ./build.sh'
                        """
                    }
                }
            }
        }
    }
}
