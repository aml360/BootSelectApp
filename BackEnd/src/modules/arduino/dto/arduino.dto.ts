export interface ArduinoDTO {
	discos: DiscoDTO[];
}
interface DiscoDTO {
	/** Fecha que indica cuando el disco tiene corriente aunque solo interesa los minutos y hora */
	boot: Date;
	/** Fecha que indica cuando el disco NO tiene corriente aunque solo interesa los minutos y hora */
	shutdown: Date;
	/** Variable calculada por el servidor, manda un true si el disco debería tener corriente en EL MOMENTO de la petición */
	upNow: boolean;
}
