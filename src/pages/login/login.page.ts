import { Component, OnInit } from "@angular/core";
import {
    FormGroup,
    Validators,
    FormBuilder,
    ValidationErrors,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { AccountService } from "src/services/account.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
    form: FormGroup;
    submitted = false;
    loading = false;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public alertController: AlertController,
        private accountService: AccountService
    ) {
        if (this.accountService.userValue) {
            this.router.navigate(["/home"]);
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ["", Validators.required],
            password: ["", Validators.required],
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

        this.loading = true;
        this.accountService
            .login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                (data) => {
                    this.handleLoginSuccess();
                },
                (error) => {
                    console.log(error);
                    this.presentAlert(error.error);
                    this.loading = false;
                }
            );
    }

    handleLoginSuccess() {
        this.loading = false;
        this.router.navigate(["/home"]);
    }

    handleOpenRegisterPage() {
        this.router.navigate(["/register"]);
    }
}
