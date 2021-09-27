import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
	selector: 'app-session',
	templateUrl: './session.component.html',
	styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
	constructor(private jwtService: JwtService, private router: Router) {}
	// Type assert because the component should only be created when the user has logged in
	username!: string;

	ngOnInit(): void {
		this.username = this.jwtService.getDecodedToken()?.username ?? 'NoLoged';
	}

	// TODO: TSdoc in english
	/** Función que cierra sesión (Borra el token de las cookies y localStorage), redirige al login y recarga la pagina */
	closeSession(): void {
		this.jwtService.rmToken();
		this.router.navigate([env.LOGIN_ROUTE]);
		// TODO: TSdoc in english
		//Recarga la página para asi no tener problemas con el cache de la aplicación
		location.reload();
	}
}
