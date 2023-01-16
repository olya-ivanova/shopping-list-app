import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ShoppingListService {
    constructor(private http: HttpClient) {}

    // getItem(): Observable<any[]> {
    //     return this.http.get<any[]>('http://localhost:3000/categories');
    // }

    // addItem(name: string): Observable<any> {
    //     const category = {name: name};
    //     return this.http.post<any>('http://localhost:3000/categories', JSON.stringify(category));
    // }

    // editItem(id: any, category: any): Observable<any> {
    //     return this.http.put<any>(`http://localhost:3000/categories/${id}`, JSON.stringify(category));
    // }

    // removeItem(id: any): Observable<{}>{
    //     return this.http.delete(`http://localhost:3000/categories/${id}`);
    // }
}