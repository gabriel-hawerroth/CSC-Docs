import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SubSection } from '../models/sub-section';

@Injectable({
  providedIn: 'root',
})
export class SubSectionService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}primary-section`;

  constructor(private http: HttpClient) {}

  createSubSection(SubSection: SubSection) {
    return this.http.post<SubSection>(this.apiUrl, SubSection);
  }

  getSubSections(): Observable<SubSection[]> {
    return this.http.get<SubSection[]>(this.apiUrl);
  }

  updateSubSection(formData: FormData) {
    return this.http.put<FormData>(this.apiUrl, formData);
  }

  removeSubSection(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<SubSection>(url);
  }
}
