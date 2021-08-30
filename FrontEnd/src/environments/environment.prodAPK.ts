import { Environment } from './environment-type';

export const environment: Environment = {
	IS_PRODUCTION_ENV: true,
	API_URL: 'https://itaca.amli360.com/api',
	JWT_NAME: 'login-token',
	LOGIN_ROUTE: '/auth/login',
	IS_API_URL_DYNAMIC: false,
	API_URL_TO_ADD: undefined,
	JWT_INTERVAL: 30000,
	msgLoggerNumber: 50
};
