import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSearchMineComponent } from './program-search-mine.component';

describe('ProgramSearchMineComponent', () => {
  let component: ProgramSearchMineComponent;
  let fixture: ComponentFixture<ProgramSearchMineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramSearchMineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramSearchMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
