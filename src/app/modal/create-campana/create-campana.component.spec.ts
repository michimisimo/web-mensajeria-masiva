import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCampanaComponent } from './create-campana.component';

describe('CreateCampanaComponent', () => {
  let component: CreateCampanaComponent;
  let fixture: ComponentFixture<CreateCampanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCampanaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCampanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
