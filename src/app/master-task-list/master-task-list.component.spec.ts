import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTaskListComponent } from './master-task-list.component';

describe('MasterTaskListComponent', () => {
  let component: MasterTaskListComponent;
  let fixture: ComponentFixture<MasterTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
