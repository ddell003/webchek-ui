import { TestBed } from '@angular/core/testing';

import { SitesService } from './sites.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('SitesService', () => {
  let service: SitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [HttpClientModule, HttpClientModule],
    });
    service = TestBed.inject(SitesService);


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
