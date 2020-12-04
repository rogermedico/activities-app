import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationCrudComponent } from './education-crud.component';

describe('EducationCrudComponent', () => {
  let component: EducationCrudComponent;
  let fixture: ComponentFixture<EducationCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
