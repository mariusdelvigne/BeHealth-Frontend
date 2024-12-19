import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewAllGlobalMessageComponent} from './view-all-global-message.component';

describe('ViewAllGlobalMessageComponent', () => {
  let component: ViewAllGlobalMessageComponent;
  let fixture: ComponentFixture<ViewAllGlobalMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllGlobalMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllGlobalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
