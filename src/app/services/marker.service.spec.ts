import { TestBed } from '@angular/core/testing';

import { MarkerService } from './marker.service';
import { HttpClientModule } from '@angular/common/http';

describe('MarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: MarkerService = TestBed.get(MarkerService);
    expect(service).toBeTruthy();
  });
});
