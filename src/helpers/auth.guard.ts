import { Injectable } from "@angular/core";
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from "@angular/router";
import { AlertController } from "@ionic/angular";

import { AccountService } from "src/services/account.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private alertController: AlertController
    ) {}

    async presentAlert(message: string) {
        const alert = await this.alertController.create({
            cssClass: "alert-class",
            header: "Error",
            message,
            buttons: ["OK"],
        });

        await alert.present();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user) {
            // authorised so return true
            return true;
        }

        this.presentAlert("You are not logged in");
        // not logged in so redirect to login page with the return url
        this.router.navigate(["/login"], {
            queryParams: { returnUrl: state.url },
        });
        return false;
    }
}
