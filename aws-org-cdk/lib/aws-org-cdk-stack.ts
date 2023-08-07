import * as cdk from 'aws-cdk-lib';
import * as org from 'aws-cdk-lib/aws-organizations';
import { Construct } from 'constructs';

export class AwsOrgCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an AWS Organization
    const organization = new org.CfnOrganization(this, 'mgarber-ops', {
      featureSet: 'ALL',
    });

    // Create an OU
    const cfnOrganizationalUnit = new org.CfnOrganizationalUnit(this, 'test-ou-a', {
      name: 'test-ou-a',
      parentId: organization.attrRootId,

  });
  

  // Account Dictionary
  const accounts: { [key: string]: any } = {
    account1: {
      name: "poc-account-a",
      email:'mgarber441+account1@gmail.com',
    },

    account2: {
      name: "poc-account-b",
      email: 'mgarber441+account2@gmail.com',
    },
  };

    // Define Two Test Accounts under Newly Created Org
    const cfnAccountA = new org.CfnAccount(this, 'MyCfnAccountA', {
      accountName: accounts.account1.name,
      email: accounts.account1.email,
      parentIds: [cfnOrganizationalUnit.ref],
    });

    const cfnAccountB = new org.CfnAccount(this, 'MyCfnAccountB', {
      accountName: accounts.account2.name,
      email: accounts.account2.email,
      parentIds: [cfnOrganizationalUnit.ref],
    });
}}