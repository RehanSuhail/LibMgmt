import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditLibraryComponent } from './edit-library';

describe('EditLibrary', () => {
  let component: EditLibraryComponent;
  let fixture: ComponentFixture<EditLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLibraryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
