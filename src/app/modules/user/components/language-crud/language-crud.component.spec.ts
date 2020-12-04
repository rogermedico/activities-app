import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCrudComponent } from './language-crud.component';

describe('LanguageCrudComponent', () => {
  let component: LanguageCrudComponent;
  let fixture: ComponentFixture<LanguageCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
