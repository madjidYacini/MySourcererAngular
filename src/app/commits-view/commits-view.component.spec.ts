import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsViewComponent } from './commits-view.component';

describe('CommitsViewComponent', () => {
  let component: CommitsViewComponent;
  let fixture: ComponentFixture<CommitsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
