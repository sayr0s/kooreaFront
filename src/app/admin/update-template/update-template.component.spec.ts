import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTemplateComponent } from './update-template.component';

describe('UpdateTemplateComponent', () => {
  let component: UpdateTemplateComponent;
  let fixture: ComponentFixture<UpdateTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
