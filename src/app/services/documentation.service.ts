import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { Documentation } from '../models/documentation';
import { PersonDocumentation } from '../models/person-documentation';

@Injectable({
  providedIn: 'root',
})
export class DocumentationService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}documentation`;

  constructor(private http: HttpClient) {}

  getDocs(): Observable<Documentation[]> {
    return this.http.get<Documentation[]>(this.apiUrl);
  }

  getPersonDocs(): Observable<PersonDocumentation[]> {
    return this.http.get<PersonDocumentation[]>(`${this.apiUrl}/person`);
  }

  getById(id: number): Observable<Documentation> {
    return this.http.get<Documentation>(`${this.apiUrl}/${id}`);
  }

  saveDoc(formData: FormData) {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  removeDoc(id: number) {
    return this.http.delete<Documentation>(`${this.apiUrl}/${id}`);
  }

  getDocsBySubSection(subSectionId: number): Observable<Documentation[]> {
    return this.http.get<Documentation[]>(
      `${this.apiUrl}/bySubSec/${subSectionId}`
    );
  }

  searchInDocs(title: string): Observable<Documentation[]> {
    let params = new HttpParams();
    params = params.append('title', title);

    return this.http.get<Documentation[]>(`${this.apiUrl}/search`, { params });
  }
}
