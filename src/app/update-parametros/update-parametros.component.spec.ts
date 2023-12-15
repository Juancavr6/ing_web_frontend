import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParametrosComponent } from './update-parametros.component';

describe('UpdateParametrosComponent', () => {
  let component: UpdateParametrosComponent;
  let fixture: ComponentFixture<UpdateParametrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateParametrosComponent]
    });
    fixture = TestBed.createComponent(UpdateParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
