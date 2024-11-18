import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSearchPublicComponent } from './program-search-public.component';

describe('ProgramSearchPublicComponent', () => {
  let component: ProgramSearchPublicComponent;
  let fixture: ComponentFixture<ProgramSearchPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramSearchPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramSearchPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
