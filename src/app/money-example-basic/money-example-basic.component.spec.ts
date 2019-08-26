import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyExampleBasicComponent } from './money-example-basic.component';

describe('MoneyExampleBasicComponent', () => {
  let component: MoneyExampleBasicComponent;
  let fixture: ComponentFixture<MoneyExampleBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyExampleBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyExampleBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
