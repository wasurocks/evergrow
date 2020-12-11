import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
})
export class AppComponent {
    navigate: any;
    constructor(
        private router: Router,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.sideMenu();
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    sideMenu() {
        this.navigate = [
            {
                title: "Overview",
                url: "/home",
                icon: "albums-outline",
            },
            {
                title: "Budget",
                url: "/budget",
                icon: "wallet-outline",
            },
            {
                title: "Trends",
                url: "/analysis",
                icon: "stats-chart-outline",
            },
            {
                title: "Logout",
                icon: "log-out-outline",
            },
        ];
    }

    handleLogout() {
        this.router.navigate(["/login"]);
    }
}
