import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateCommunicationsComponent} from './create-communications.component';

describe('CreateCommunicationsComponent', () => {
  let component: CreateCommunicationsComponent;
  let fixture: ComponentFixture<CreateCommunicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCommunicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
