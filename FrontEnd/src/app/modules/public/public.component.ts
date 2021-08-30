import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Component({
	selector: 'public-component',
	templateUrl: 'public.component.html',
	styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit {
	constructor() {}

	ngOnInit() {
		setInterval(() => {
			console.log(env.API_URL);
		}, 5000);
	}
}
