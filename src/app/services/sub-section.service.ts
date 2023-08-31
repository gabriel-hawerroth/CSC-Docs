import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { SubSection } from '../models/sub-section';
import { PersonSubSection } from '../models/person-sub-section';

@Injectable({
  providedIn: 'root',
})
export class SubSectionService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}subSection`;

  constructor(private http: HttpClient) {}

  getSubSections(): Observable<SubSection[]> {
    return this.http.get<SubSection[]>(this.apiUrl);
  }

  getPersonSubSections(): Observable<PersonSubSection[]> {
    return this.http.get<PersonSubSection[]>(`${this.apiUrl}/person`);
  }

  getById(id: number): Observable<SubSection> {
    return this.http.get<SubSection>(`${this.apiUrl}/${id}`);
  }

  getByPrimarySection(id: number): Observable<SubSection[]> {
    return this.http.get<SubSection[]>(`${this.apiUrl}/primarySection/${id}`);
  }

  saveSubSection(formData: FormData) {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  removeSubSection(id: number) {
    return this.http.delete<SubSection>(`${this.apiUrl}/${id}`);
  }
}
