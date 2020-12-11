import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { Entry } from "src/models/data";
import { DataService } from "src/services/data.service";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage {
    entries: Array<Entry>;
    budget: number;

    constructor(
        private router: Router,
        private dataService: DataService,
        private alertController: AlertController
    ) {
        this.entries = [];
        this.budget = 0;
    }

    ionViewWillEnter() {
        this.getData();
        this.getBudget();
    }

    async presentAlert(message: string, header?: string) {
        const alert = await this.alertController.create({
            cssClass: "alert-class",
            header: header || "Error",
            message,
            buttons: ["OK"],
        });

        await alert.present();
    }

    handleDelete(_id: string) {
        this.dataService
            .removeEntry(_id)
            .pipe(first())
            .subscribe(
                (data) => {
                    console.log(data);
                    this.presentAlert("Entry has been deleted", "Success");
                    this.getData();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    getBudget() {
        this.dataService
            .getBudget()
            .pipe(first())
            .subscribe(
                (data) => {
                    console.log(data);
                    this.budget = data;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    getData() {
        this.dataService
            .getAllEntries()
            .pipe(first())
            .subscribe(
                (data) => {
                    this.entries = data
                        .map((entry) => {
                            return {
                                ...entry,
                                _id: entry["_id"]["$oid"],
                                createdAt: entry["createdAt"]["$date"],
                            };
                        })
                        .reverse();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    handleOpenAddPage() {
        this.router.navigate(["/add"]);
    }
}
