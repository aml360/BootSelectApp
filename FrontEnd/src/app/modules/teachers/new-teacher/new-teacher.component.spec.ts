import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTeacherComponent } from './new-teacher.component';

describe('NewTeacherComponent', () => {
  let component: NewTeacherComponent;
  let fixture: ComponentFixture<NewTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
