import { Route } from '@angular/router';
import { Roles } from 'sharedInterfaces/Entities';

/** TODO: Docs */
export type AppRoute = {
	data?: { roles: Roles[] };
} & Route;
