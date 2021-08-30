import { Component, OnInit } from '@angular/core';
import { Roles } from 'sharedInterfaces/Entities';
import { LoginGuard } from 'src/app/guards/login.guard';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
	constructor(private loginGuard: LoginGuard) {}
	/** Variable usada para mostrar o no los menus del administrador */
	isAdmin: boolean = false;
	collapsed: boolean = true;
	clase: string = '';
	collapse(): void {}
	ngOnInit(): void {
		this.isAdmin = this.loginGuard.hasRole(Roles.ADMIN);
		//Solución rapida para colapsar el menu cuando se entra desde un movil
		if (window.innerWidth < 765) {
			this.collapseSideMenu();
		}
	}

	/**
	 * Metodo que colapsa o muestra el menu modificando la variable 'clase' del componente
	 * Intercambia su valor entre collapse y nada;
	 */
	collapseSideMenu(): void {
		if (this.clase === 'collapse') {
			this.clase = '';
		} else {
			this.clase = 'collapse';
		}
	}
}
