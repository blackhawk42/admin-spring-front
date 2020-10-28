import { TestBed } from '@angular/core/testing';

import { PopUpService } from './pop-up.service';
import { HttpClientModule } from '@angular/common/http';

describe('PopUpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [HttpClientModule],
    providers : [HttpClientModule]

  }));

  it('should be created', () => {
    const service: PopUpService = TestBed.get(PopUpService);
    expect(service).toBeTruthy();
  });
});
