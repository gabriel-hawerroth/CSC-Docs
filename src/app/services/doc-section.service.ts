import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { DocSection } from '../models/doc-section';

@Injectable({
  providedIn: 'root',
})
export class DocSectionService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}docSection`;

  constructor(private http: HttpClient) {}

  createDocSection(docSection: DocSection) {
    return this.http.post<DocSection>(this.apiUrl, docSection);
  }

  getDocSections(): Observable<DocSection[]> {
    return this.http.get<DocSection[]>(this.apiUrl);
  }

  getById(id: number): Observable<DocSection> {
    return this.http.get<DocSection>(`${this.apiUrl}/${id}`);
  }

  updateDocSection(formData: FormData) {
    return this.http.put<FormData>(this.apiUrl, formData);
  }

  removeDocSection(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<DocSection>(url);
  }
}
