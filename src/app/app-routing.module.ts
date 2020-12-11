import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/helpers/auth.guard";

const routes: Routes = [
    {
        path: "home",
        loadChildren: () =>
            import("../pages/home/home.module").then((m) => m.HomePageModule),
        canActivate: [AuthGuard],
    },
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
    },
    {
        path: "login",
        loadChildren: () =>
            import("../pages/login/login.module").then(
                (m) => m.LoginPageModule
            ),
    },
    {
        path: "register",
        loadChildren: () =>
            import("../pages/register/register.module").then(
                (m) => m.RegisterPageModule
            ),
    },
    {
        path: "analysis",
        loadChildren: () =>
            import("../pages/analysis/analysis.module").then(
                (m) => m.AnalysisPageModule
            ),
        canActivate: [AuthGuard],
    },
    {
        path: "budget",
        loadChildren: () =>
            import("../pages/budget/budget.module").then(
                (m) => m.BudgetPageModule
            ),
        canActivate: [AuthGuard],
    },
    {
        path: "add",
        loadChildren: () =>
            import("../pages/add/add.module").then((m) => m.AddPageModule),
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
