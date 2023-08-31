import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { DocSubSection } from '../models/doc-sub-section';

@Injectable({
  providedIn: 'root',
})
export class DocSubSectionService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}docSubSection`;

  constructor(private http: HttpClient) {}

  createDocSubSection(docSubSection: DocSubSection) {
    return this.http.post<DocSubSection>(this.apiUrl, docSubSection);
  }

  getDocSubSections(): Observable<DocSubSection[]> {
    return this.http.get<DocSubSection[]>(this.apiUrl);
  }

  getById(id: number): Observable<DocSubSection> {
    return this.http.get<DocSubSection>(`${this.apiUrl}/${id}`);
  }

  updateDocSection(formData: FormData) {
    return this.http.put<FormData>(this.apiUrl, formData);
  }

  removeDocSubSection(id: number) {
    return this.http.delete<DocSubSection>(`${this.apiUrl}/${id}`);
  }
}
