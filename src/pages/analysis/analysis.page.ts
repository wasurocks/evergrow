import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { DataService } from "src/services/data.service";

@Component({
    selector: "app-analysis",
    templateUrl: "./analysis.page.html",
    styleUrls: ["./analysis.page.scss"],
})
export class AnalysisPage implements OnInit {
    avgDailySpending: string;
    maxDailySpending: string;
    budgetDeviation: string;

    constructor(private dataService: DataService) {
        this.avgDailySpending = "...";
        this.maxDailySpending = "...";
        this.budgetDeviation = "...";
    }

    ngOnInit() {}

    ionViewWillEnter() {
        this.getAllData();
    }

    checkBadDeviation() {
        return parseInt(this.budgetDeviation) < 0;
    }

    getAllData() {
        this.dataService
            .getAvgDailySpending()
            .pipe(first())
            .subscribe(
                (data) => {
                    console.log(data);
                    this.avgDailySpending = data.toString();
                },
                (error) => {
                    console.log(error);
                }
            );
        this.dataService
            .getMaxDailySpending()
            .pipe(first())
            .subscribe(
                (data) => {
                    console.log(data);
                    this.maxDailySpending = data.toString();
                },
                (error) => {
                    console.log(error);
                }
            );
        this.dataService
            .getBudgetDeviation()
            .pipe(first())
            .subscribe(
                (data) => {
                    console.log(data);
                    this.budgetDeviation = data.toString() + " %";
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}
