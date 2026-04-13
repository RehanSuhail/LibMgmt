import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLibraryComponent } from './delete-library';

describe('DeleteLibrary', () => {
  let component: DeleteLibraryComponent;
  let fixture: ComponentFixture<DeleteLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLibraryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
