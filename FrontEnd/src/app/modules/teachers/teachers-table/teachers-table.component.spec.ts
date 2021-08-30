import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersTableComponent } from './teachers-table.component';

describe('TeachersTableComponent', () => {
	let component: TeachersTableComponent;
	let fixture: ComponentFixture<TeachersTableComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TeachersTableComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TeachersTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
