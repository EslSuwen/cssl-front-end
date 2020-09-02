import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNoticComponent } from './details-notic.component';

describe('DetailsNoticComponent', () => {
  let component: DetailsNoticComponent;
  let fixture: ComponentFixture<DetailsNoticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsNoticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsNoticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
