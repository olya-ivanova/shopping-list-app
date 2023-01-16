import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay } from "rxjs";

@Injectable()
export class CategoriesService {
    constructor(private http: HttpClient) {}

    getCategories(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3000/categories');
    }

    addCategory(category: any): Observable<any> {
        return this.http.post<any>('http://localhost:3000/categories', category);
    }

    editCategory(id: any, category: any): Observable<any> {
        return this.http.put<any>(`http://localhost:3000/categories/${id}`, category);
    }

    removeCategory(id: any): Observable<{}>{
        return this.http.delete(`http://localhost:3000/categories/${id}`);
    }

    getCategoriesScrollable(page: number): Observable<any> {
        return this.http.get<any[]>(`http://localhost:3000/categories?_page=${page}&_limit=20`)
        .pipe(delay(0));
    }
}