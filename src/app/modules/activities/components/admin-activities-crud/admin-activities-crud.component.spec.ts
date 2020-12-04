import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActivitiesCrudComponent } from './admin-activities-crud.component';

describe('AdminActivitiesCrudComponent', () => {
  let component: AdminActivitiesCrudComponent;
  let fixture: ComponentFixture<AdminActivitiesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminActivitiesCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActivitiesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
