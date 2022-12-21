import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CheckTutorial } from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full',
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account/account.module').then((m) => m.AccountModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./pages/support/support.module').then((m) => m.SupportModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./pages/tabs-page/tabs-page.module').then((m) => m.TabsModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'tutorial',
    loadChildren: () =>
      import('./pages/tutorial/tutorial.module').then((m) => m.TutorialModule),
    canLoad: [CheckTutorial],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'requests',
    loadChildren: () =>
      import('./pages/requests/requests.module').then(
        (m) => m.RequestsPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'more',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./pages/services/services.module').then(
        (m) => m.ServicesPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('./pages/faq/faq.module').then((m) => m.FaqPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./pages/contact/contact.module').then((m) => m.ContactPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'sos',
    loadChildren: () =>
      import('./pages/sos/sos.module').then((m) => m.SosPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'nearest-places',
    loadChildren: () =>
      import('./pages/nearest-places/nearest-places.module').then(
        (m) => m.NearestPlacesPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'general-form',
    loadChildren: () =>
      import('./pages/general-form/general-form.module').then(
        (m) => m.GeneralFormPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'more',
    loadChildren: () =>
      import('./pages/more/more.module').then((m) => m.MorePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'privacy',
    loadChildren: () =>
      import('./pages/privacy/privacy.module').then((m) => m.PrivacyPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'salary-payment',
    loadChildren: () =>
      import('./pages/salary-payments/salary-payments.module').then(
        (m) => m.SalaryPaymentsPageModule
      ),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
