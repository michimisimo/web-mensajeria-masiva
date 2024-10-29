import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDestinatarioComponent } from './edit-destinatario.component';

describe('EditDestinatarioComponent', () => {
  let component: EditDestinatarioComponent;
  let fixture: ComponentFixture<EditDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDestinatarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
