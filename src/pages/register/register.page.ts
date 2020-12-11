import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { AccountService } from "src/services/account.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.page.html",
    styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
    form: FormGroup;
    submitted = false;
    loading = false;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private alertController: AlertController,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ["", Validators.required, Validators.minLength(6)],
            password: ["", Validators.required],
            confirmPassword: ["", Validators.required, Validators.minLength(6)],
        });
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

    checkPasswords(group: FormGroup) {
        // here we have the 'passwords' group
        let pass = group.get("password").value;
        let confirmPass = group.get("confirmPassword").value;

        return pass === confirmPass;
    }

    get f() {
        return this.form.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (!this.checkPasswords(this.form)) {
            this.presentAlert("Passwords not matching");
            return;
        }

        if (this.form.invalid) {
            this.presentAlert("Please check all fields.");
            return;
        }

        this.loading = true;
        this.accountService
            .register({
                username: this.f.username.value,
                password: this.f.password.value,
            })
            .pipe(first())
            .subscribe(
                (data) => {
                    this.presentAlert("You have been registered", "Successful");
                    this.handleRegisterSuccess();
                },
                (error) => {
                    this.presentAlert(error.error);
                    this.loading = false;
                }
            );
    }

    handleRegisterSuccess() {
        this.loading = false;
        this.router.navigate(["/"]);
    }
}
