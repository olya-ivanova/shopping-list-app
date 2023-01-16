import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpClient) {}

    getUsers(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3000/signup');
    }

    addUser(user: any): Observable<any> {
        return this.http.post<any>('http://localhost:3000/signup', user);
    }

    editUser(id: any, user: any): Observable<any> {
        return this.http.put<any>(`http://localhost:3000/signup/${id}`, user);
    }

    removeUser(id: any): Observable<{}>{
        return this.http.delete(`http://localhost:3000/signup/${id}`);
    }

    getScrollable(page: number): Observable<any> {
        return this.http.get<any[]>(`http://localhost:3000/signup?page=${page}&_limit=20`)
        .pipe(delay(0));
    }
}