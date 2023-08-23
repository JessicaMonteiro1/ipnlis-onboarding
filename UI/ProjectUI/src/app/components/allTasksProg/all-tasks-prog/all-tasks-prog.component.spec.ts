import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTasksProgComponent } from './all-tasks-prog.component';

describe('AllTasksProgComponent', () => {
  let component: AllTasksProgComponent;
  let fixture: ComponentFixture<AllTasksProgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTasksProgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTasksProgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
