import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampanaComponent } from './edit-campana.component';

describe('EditCampanaComponent', () => {
  let component: EditCampanaComponent;
  let fixture: ComponentFixture<EditCampanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCampanaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCampanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
