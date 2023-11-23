import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCuentaComponent } from './create-cuenta.component';

describe('CreateCuentaComponent', () => {
  let component: CreateCuentaComponent;
  let fixture: ComponentFixture<CreateCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCuentaComponent]
    });
    fixture = TestBed.createComponent(CreateCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
