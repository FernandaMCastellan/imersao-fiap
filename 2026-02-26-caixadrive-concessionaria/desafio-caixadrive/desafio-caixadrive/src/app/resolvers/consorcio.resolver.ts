import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const consorcioResolver: ResolveFn<any> = () => {

  const http = inject(HttpClient);
  return http.get('assets/data/estoque.json');
};
