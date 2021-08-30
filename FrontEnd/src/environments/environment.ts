// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from './environment-type';

export const environment: Environment = {
	IS_PRODUCTION_ENV: false,
	API_URL: 'http://localhost:3000/api',
	JWT_NAME: 'login-token',
	LOGIN_ROUTE: '/auth/login',
	IS_API_URL_DYNAMIC: false,
	API_URL_TO_ADD: undefined,
	JWT_INTERVAL: 30000,
	msgLoggerNumber: 50,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
