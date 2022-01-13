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

## Test Setup

To test the setup you can show that users with no token cannot access the `/example` endpoint, whereas users with either `guest` or `admin` tokens can access a get on the endpoint. First setup required environment variables:

```
export GUEST_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZ3Vlc3QiLCJzdWIiOiJZV3hwWTJVPSIsIm5iZiI6MTUxNDg1MTEzOSwiZXhwIjoxNjQxMDgxNTM5fQ.K5DnnbbIOspRbpCr2IKXE9cPVatGOCBrBQobQmBmaeU
export ADMIN_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiJZbTlpIiwibmJmIjoxNTE0ODUxMTM5LCJleHAiOjE2NDEwODE1Mzl9.WCxNAveAVAdRCmkpIObOTaSd0AJRECY2Ch2Qdic3kU8
```

Now test the following scenarios.

No token:

```
curl -i <API>
```

GUEST token:

```
curl -i -H "Authorization: Bearer $GUEST_TOKEN" <API>
```

```
curl -i -H "Authorization: Bearer $GUEST_TOKEN" <API> \--header 'usergroup: ViewerGroup' \--header 'resource: recordA'
```

ADMIN token:

```
curl -i -H "Authorization: Bearer $ADMIN_TOKEN" <API>
```

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

```

```
