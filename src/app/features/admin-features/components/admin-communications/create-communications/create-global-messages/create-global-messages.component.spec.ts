import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateGlobalMessagesComponent} from './create-global-messages.component';

describe('CreateGlobalMessagesComponent', () => {
  let component: CreateGlobalMessagesComponent;
  let fixture: ComponentFixture<CreateGlobalMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGlobalMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGlobalMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
