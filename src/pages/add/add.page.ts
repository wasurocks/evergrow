import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { DataService } from "src/services/data.service";

@Component({
    selector: "app-add",
    templateUrl: "./add.page.html",
    styleUrls: ["./add.page.scss"],
})
export class AddPage implements OnInit {
    form: FormGroup;
    submitted = false;
    loading = false;

    constructor(
        private router: Router,
        private dataService: DataService,
        private formBuilder: FormBuilder,
        public alertController: AlertController
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            event: ["", Validators.required],
            amount: ["", Validators.required],
            detail: [""],
            itemType: ["", Validators.required],
            createdAt: ["", Validators.required],
        });
    }

    get f() {
        return this.form.controls;
    }

    async presentAlert(message: string) {
        const alert = await this.alertController.create({
            cssClass: "alert-class",
            header: "Error",
            message,
            buttons: ["OK"],
        });

        await alert.present();
    }

    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            this.presentAlert("Please fill all fields.");
            return;
        }

        console.log(this.form.get("itemType").value);

        this.loading = true;

        this.dataService
            .addEntry({
                event: this.f.event.value,
                amount: parseFloat(this.f.amount.value),
                detail: this.f.detail.value,
                itemType: this.f.itemType.value,
                createdAt: this.f.createdAt.value,
            })
            .pipe(first())
            .subscribe(
                (data) => {
                    console.log(data);
                    this.handleAddSuccess();
                },
                (error) => {
                    console.log(error);
                    this.presentAlert(error.error);
                    this.loading = false;
                }
            );
    }

    handleAddSuccess() {
        this.loading = false;
        this.router.navigate(["/home"]);
    }
}
