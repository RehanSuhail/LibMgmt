import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLibraryComponent } from './add-library';

describe('AddLibrary', () => {
  let component: AddLibraryComponent;
  let fixture: ComponentFixture<AddLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLibraryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
