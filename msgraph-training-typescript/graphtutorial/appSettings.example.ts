// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

const settings: AppSettings = {
  'clientId': '',
  'clientSecret': '',
  'tenantId': 'YOUR_TENANT_ID_HERE_IF_USING_APP_ONLY',
  'authTenant': 'common',
  'graphUserScopes': [
    'user.read',
    'mail.read',
    'mail.send'
  ]
};

export interface AppSettings {
  clientId: string;
  clientSecret: string;
  tenantId: string;
  authTenant: string;
  graphUserScopes: string[];
}

export default settings;
