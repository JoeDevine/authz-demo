import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
export class AuthzDemoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // *** Customer Authoriser Setup ***

    const opaCustomAuthLambda = new lambda.Function(this, 'OpaAuthorizer', {
      runtime: lambda.Runtime.GO_1_X,
      code: lambda.AssetCode.fromAsset('opaCustomGoAuthorizer'),
      handler: 'main',
      functionName: 'OpaCustomerGoAuthorizer',
    });

    const customOpaAuthorizer = new apigw.RequestAuthorizer(
      this,
      'customOpaAuthorizer',
      {
        handler: opaCustomAuthLambda,
        authorizerName: 'CustomOpaLambdaAuthorizer',
        identitySources: [
          apigw.IdentitySource.header('Usergroup'),
          apigw.IdentitySource.header('Resource'),
        ],
      },
    );

    // *** REST Endpoint Setup ***

    const api = new apigw.RestApi(this, 'ExampleApi', {
      restApiName: 'ExampleApi',
      description: 'Example OPA API',
    });

    const example = api.root.addResource('example');
    const example_handler = new lambda.Function(this, 'example', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'example.handler',
      functionName: 'ExampleAppLambdaFunction',
    });

    const exampleGetIntegration = new apigw.LambdaIntegration(example_handler);
    example.addMethod('GET', exampleGetIntegration, {
      authorizer: customOpaAuthorizer,
    });

    new cdk.CfnOutput(this, 'Example API URL:', {
      value: api.url + 'example' ?? 'Something went wrong with the deploy step',
    });
  }
}
