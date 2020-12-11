import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { DataService } from "src/services/data.service";

@Component({
    selector: "app-budget",
    templateUrl: "./budget.page.html",
    styleUrls: ["./budget.page.scss"],
})
export class BudgetPage implements OnInit {
    form: FormGroup;
    submitted = false;
    loading = false;

    constructor(
        private dataService: DataService,
        private formBuilder: FormBuilder,
        public alertController: AlertController,
        private router: Router
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            budget: ["", Validators.required],
        });
    }

    ionViewWillEnter() {
        this.getBudget();
    }

    get f() {
        return this.form.controls;
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

    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            this.presentAlert("Please fill budget");
            return;
        }

        this.loading = true;

        this.dataService
            .updateBudget(parseFloat(this.f.budget.value))
            .pipe(first())
            .subscribe(
                (data) => {
                    console.log(data);
                    this.presentAlert("Successfully changed budget", "Success");
                    this.loading = false;
                    this.router.navigate(["/home"]);
                },
                (error) => {
                    console.log(error);
                    this.presentAlert(error.error);
                    this.loading = false;
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
                    this.form.controls["budget"].setValue(data.toString());
                },
                (error) => {
                    console.log(error);
                    this.presentAlert(error.error);
                }
            );
    }
}
