import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClasesComponent } from './all-classrooms.component';

describe('AllClasesComponent', () => {
	let component: AllClasesComponent;
	let fixture: ComponentFixture<AllClasesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AllClasesComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AllClasesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
