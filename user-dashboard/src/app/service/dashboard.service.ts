import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpParams } from '@angular/common/http';
import { CityBreaks } from '../models/city-break.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {

    constructor(protected http: HttpBackend) {
        this.httpClient = new HttpClient(http);
    }
    httpClient: HttpClient;

    apiUrl = "http://localhost:8094"

    getCityBreaksForUser() {
        let params = new HttpParams();
        var username = (localStorage.getItem("user") ? localStorage.getItem("user") : "") as string
        params = params.append('username', username);
        return this.httpClient.get<CityBreaks[]>(`${this.apiUrl}/CityBreaks`, { params: params });
    }

    addCityBreak(city: string, date: string, cost: number) {
        var username = (localStorage.getItem("user") ? localStorage.getItem("user") : "") as string
        var params = {
            "username": username,
            "town": city,
            "date": date,
            "cost": cost
        }
        return this.httpClient.post(`${this.apiUrl}/CityBreaks`, params);
    }

    sendEmail(email: string) {
        var params = {
            "email": email
        }
        return this.httpClient.post(`${this.apiUrl}/mail`, params);
    }
}