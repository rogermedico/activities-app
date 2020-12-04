import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { API } from '@constants/api.constant';
import { Activity } from '@models/activity.model';

@Injectable({
  providedIn: "root",
})
export class ActivitiesService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(API.activities);
  }

  getActivity(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${API.activities}/${id}`);
  }

  getActivitiesByOwner(owner: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${API.activities}/?owner=${encodeURIComponent(owner)}`);
  }

  createActivity(a: Activity): Observable<any> {
    return this.http.post(API.activities, a, this.httpOptions);
  }

  updateActivity(a: Activity): Observable<any> {
    return this.http.put(API.activities, a, this.httpOptions);
  }

  deleteActivity(i: number): Observable<any> {
    return this.http.delete(`${API.activities}/${i}`);
  }

}
