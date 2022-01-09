#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { AuthzDemoStack } from '../lib/authz-demo-stack';

const app = new cdk.App();
new AuthzDemoStack(app, 'AuthzDemoStack');
