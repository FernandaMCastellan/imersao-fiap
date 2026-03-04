import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { consorcioResolver } from './consorcio.resolver';

describe('consorcioResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => consorcioResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
