export type Environment = {
	/** Should be `true` if the dist generated by the compiler will be used in the production environment */
	readonly IS_PRODUCTION_ENV: boolean;
	/** `true` si {@link apiUrl} debe cambiar a location.origin `false` se utiliza apiUrl tal cual*/
	readonly IS_API_URL_DYNAMIC: boolean;
	/** Is the BASE URL which the front will request data to */
	readonly API_URL: string;
	/** La parte de la url que se suma a location.origin si apiUrl es dinamica */
	readonly API_URL_TO_ADD: string | undefined;
	/** El intervalo de tiempo en `ms` en el cual se renovará el jwt si ha habido interacción del usuario */
	readonly JWT_INTERVAL: number;
	/** Nombre que se le da a la cookie/objeto guardado en las cookies/localStorage (Usado para buscar luego por clave-valor)*/
	readonly JWT_NAME: string;
	// TODO: TSdoc, /auth/login
	readonly LOGIN_ROUTE: '/auth/login';
	/** Numero de mensajes que el logger guardará en su array interno */
	readonly msgLoggerNumber: number;
};