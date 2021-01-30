import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SitesComponent } from './sites.component';

describe('SitesComponent', () => {
  let component: SitesComponent;
  let fixture: ComponentFixture<SitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [HttpClientModule],
      declarations: [ SitesComponent ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
