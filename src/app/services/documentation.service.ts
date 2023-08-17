import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Documentation } from '../models/documentation';

@Injectable({
  providedIn: 'root',
})
export class DocumentationService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}primary-section`;

  constructor(private http: HttpClient) {}

  createDocs(doc: Documentation) {
    return this.http.post<Documentation>(this.apiUrl, doc);
  }

  getDocs(): Observable<Documentation[]> {
    return this.http.get<Documentation[]>(this.apiUrl);
  }

  updateDoc(formData: FormData) {
    return this.http.put<FormData>(this.apiUrl, formData);
  }

  removeDoc(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Documentation>(url);
  }

  searchInDocs(title: string): Observable<Documentation[]> {
    let params = new HttpParams();
    params = params.append('title', title);

    return this.http.get<Documentation[]>(`${this.apiUrl}/search`, { params });
  }
}
