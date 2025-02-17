// planning.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

interface Planning {
  id: string;
  niveau: number;
  filename: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlanningService {
  private apiUrl = `${environment.apiUrl}/planning`;

  constructor(private http: HttpClient) {}

  // Create a new planning item
  createPlanning(level: number, file: File): Observable<Planning> {
    const formData = new FormData();
    formData.append('planningImage', file);
    formData.append('niveau', level.toString());
    return this.http.post<Planning>(`${this.apiUrl}/create/${level}`, formData);
  }

  // Get all planning items
  getAllPlannings(): Observable<Planning[]> {
    return this.http.get<Planning[]>(`${this.apiUrl}`);
  }

  // Get a planning item by ID
  getPlanningById(id: string): Observable<Planning> {
    return this.http.get<Planning>(`${this.apiUrl}/${id}`);
  }

  // Update a planning item by ID
  updatePlanning(id: string, level: number, file?: File): Observable<Planning> {
    const formData = new FormData();
    if (file) {
      formData.append('planningImage', file);
    }
    formData.append('niveau', level.toString());
    return this.http.put<Planning>(`${this.apiUrl}/${id}`, formData);
  }

  // Delete a planning item by ID
  deletePlanning(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
