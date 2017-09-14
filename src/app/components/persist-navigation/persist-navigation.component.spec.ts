import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersistNavigationComponent } from './persist-navigation.component';

describe('PersistNavigationComponent', () => {
  let component: PersistNavigationComponent;
  let fixture: ComponentFixture<PersistNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersistNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersistNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
