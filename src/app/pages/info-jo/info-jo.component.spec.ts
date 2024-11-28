import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoJOComponent } from './info-jo.component';

describe('InfoJOComponent', () => {
  let component: InfoJOComponent;
  let fixture: ComponentFixture<InfoJOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoJOComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoJOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
