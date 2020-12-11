import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { Entry } from "src/models/data";

@Injectable({ providedIn: "root" })
export class DataService {
    constructor(private router: Router, private http: HttpClient) {}

    addEntry(entry: Entry) {
        return this.http
            .post(`${environment.apiUrl}/add-expense`, {
                event: entry.event,
                amount: entry.amount,
                detail: entry.detail,
                date: entry.createdAt,
                itemType: entry.itemType,
            })
            .pipe(
                map((res) => {
                    return res;
                })
            );
    }

    removeEntry(_id: string) {
        return this.http
            .post(`${environment.apiUrl}/remove-expense`, {
                _id: _id,
            })
            .pipe(
                map((res) => {
                    return res;
                })
            );
    }

    getAllEntries() {
        return this.http.get(`${environment.apiUrl}/get-all-expenses`).pipe(
            map((res) => {
                return (res as any).expenses as Array<Entry>;
            })
        );
    }

    updateBudget(budget: number) {
        return this.http
            .post(`${environment.apiUrl}/update-budget`, {
                budget: budget,
            })
            .pipe(
                map((res) => {
                    return (res as any).monthlyBudget as number;
                })
            );
    }

    getBudget() {
        return this.http.get(`${environment.apiUrl}/get-budget`).pipe(
            map((res) => {
                return (res as any).monthlyBudget as number;
            })
        );
    }

    getAvgDailySpending() {
        return this.http.get(`${environment.apiUrl}/avg-spending-daily`).pipe(
            map((res) => {
                return (res as any).result as number;
            })
        );
    }

    getMaxDailySpending() {
        return this.http.get(`${environment.apiUrl}/max-spending-daily`).pipe(
            map((res) => {
                return (res as any).result as number;
            })
        );
    }

    getBudgetDeviation() {
        return this.http.get(`${environment.apiUrl}/budget-deviation`).pipe(
            map((res) => {
                return (res as any).result as number;
            })
        );
    }
}
