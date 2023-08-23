import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskProgComponent } from './edit-task-prog.component';

describe('EditTaskProgComponent', () => {
  let component: EditTaskProgComponent;
  let fixture: ComponentFixture<EditTaskProgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskProgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskProgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
