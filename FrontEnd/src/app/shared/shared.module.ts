import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { SessionComponent } from './session/session.component';
import { JwtService } from '../services/jwt.service';
import { LoginGuard } from '../guards/login.guard';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
	declarations: [MenuComponent, SessionComponent, LayoutComponent],
	//Import RouterModule if not the menu doesn't work
	imports: [CommonModule, RouterModule],
	exports: [MenuComponent, SessionComponent],
	providers: [LoginGuard, JwtService],
})
export class SharedModule {}
