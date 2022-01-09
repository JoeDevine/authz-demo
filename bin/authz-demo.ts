#!/usr/bin/env node
import { App, Tags } from '@aws-cdk/core';
import { AuthzDemoStack } from '../lib/authz-demo-stack';

const app = new App();
const DemoStack = new AuthzDemoStack(app, 'AuthzDemoStack');

Tags.of(DemoStack).add('Name', 'Joe Devine');
Tags.of(DemoStack).add('Project', 'Authorisation Demo');
