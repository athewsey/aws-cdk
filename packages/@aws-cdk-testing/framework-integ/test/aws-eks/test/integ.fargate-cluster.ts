/// !cdk-integ pragma:disable-update-workflow
import { App, Stack } from 'aws-cdk-lib';
import * as integ from '@aws-cdk/integ-tests-alpha';
import { getClusterVersionConfig } from './integ-tests-kubernetes-version';
import * as eks from 'aws-cdk-lib/aws-eks';

class EksFargateClusterStack extends Stack {

  constructor(scope: App, id: string) {
    super(scope, id);

    new eks.FargateCluster(this, 'FargateCluster', {
      ...getClusterVersionConfig(this),
      prune: false,
    });
  }
}

const app = new App();

const stack = new EksFargateClusterStack(app, 'aws-cdk-eks-fargate-cluster-test');
new integ.IntegTest(app, 'aws-cdk-eks-fargate-cluster', {
  testCases: [stack],
});

app.synth();