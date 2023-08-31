import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { PrimarySection } from '../models/primary-section';

@Injectable({
  providedIn: 'root',
})
export class PrimarySectionService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}primarySection`;

  constructor(private http: HttpClient) {}

  getPrimarySections(): Observable<PrimarySection[]> {
    return this.http.get<PrimarySection[]>(this.apiUrl);
  }

  getById(id: number): Observable<PrimarySection> {
    return this.http.get<PrimarySection>(`${this.apiUrl}/${id}`);
  }

  savePrimarySection(formData: FormData) {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  removePrimarySection(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
