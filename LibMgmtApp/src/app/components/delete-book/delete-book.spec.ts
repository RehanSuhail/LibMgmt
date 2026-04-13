import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookComponent } from './delete-book';

describe('DeleteBook', () => {
  let component: DeleteBookComponent;
  let fixture: ComponentFixture<DeleteBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBookComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
