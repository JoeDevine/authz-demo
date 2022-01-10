# Demo repo for Serverless implementation of OPA for Authorisation

This repo contains a CDK app with an instance of a stack (`AuthzDemoStack`) which contains a lambda exposed via API Gateway with a custom Authoriser built with OPA.

## Architecture

The below diagram illustrates a _very_ high level overview of the architecture of the resources deployed as part of this demo stack.

![Architecture of Demo Authorisation Stack](https://d2908q01vomqb2.cloudfront.net/ca3512f4dfa95a03169c5a670a4c91a19b3077b4/2021/04/26/srihap_custom_lambda_f2.png)

## Getting Started

In order to deploy this stack you need to first install the required dependencies and then compile the typescript to Javascript for deployment via a build:

```
npm i
npm run build
```

Once this is complete, you then need to compile the OPA Custom Authoriser via the commands in the Makefile in the root of the directory:

```
make deps
make clean
make opabuild
```

Once you have completed both steps, you can then deploy the stack to your given environment via CDK:

```
cdk deploy
```

_note:_ For guidance on installing cdk locally and connecting to your environment visit the [AWS Getting Started Guide](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html)

### Useful Commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
- `make deps` installs the required dependencies to compile the custom Go Authoriser
- `make clean` removes the previously compiled Go code
- `make opabuild` compiles the Authoriser and includes the files provided in the data folder
