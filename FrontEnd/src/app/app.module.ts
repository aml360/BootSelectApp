import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
registerLocaleData(localeEs);
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [AppComponent],

	imports: [BrowserModule, AppRoutingModule, SharedModule, HttpClientModule, BrowserAnimationsModule],
	exports: [SharedModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
