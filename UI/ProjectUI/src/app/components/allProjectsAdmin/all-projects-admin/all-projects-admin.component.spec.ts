import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectsAdminComponent } from './all-projects-admin.component';

describe('AllProjectsAdminComponent', () => {
  let component: AllProjectsAdminComponent;
  let fixture: ComponentFixture<AllProjectsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProjectsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProjectsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
