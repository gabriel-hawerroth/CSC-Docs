import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PrimarySection } from '../models/primary-section';

@Injectable({
  providedIn: 'root',
})
export class PrimarySectionService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}primary-section`;

  constructor(private http: HttpClient) {}

  createPrimarySection(primarySection: PrimarySection) {
    return this.http.post<PrimarySection>(this.apiUrl, primarySection);
  }

  getPrimarySections(): Observable<PrimarySection[]> {
    return this.http.get<PrimarySection[]>(this.apiUrl);
  }

  getById(id: number): Observable<PrimarySection> {
    return this.http.get<PrimarySection>(`${this.apiUrl}/${id}`);
  }

  updatePrimarySection(formData: FormData) {
    return this.http.put<FormData>(this.apiUrl, formData);
  }

  removePrimarySection(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<PrimarySection>(url);
  }
}
