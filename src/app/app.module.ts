import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';

import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzSliderModule} from 'ng-zorro-antd/slider';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzPipesModule} from 'ng-zorro-antd/pipes';

import {AppComponent} from './app.component';
import {LoginComponent} from './index/login/login.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {PersonalInfoComponent} from './side-nav/personal-info/personal-info.component';
import {UploadComponent} from './side-nav/upload/upload.component';
import {CardComponent} from './side-nav/card/card.component';
import {ApplyComponent} from './side-nav/apply/apply.component';
import {FooterComponent} from './side-nav/footer/footer.component';
import {SideCardComponent} from './side-nav/side-card/side-card.component';
import {UpdatePasswordComponent} from './side-nav/update-password/update-password.component';
import {ModalComponent} from './modal/modal.component';
import {HasRoleDirective} from './auth/has-role.directive';
import {CanActivateAuthGuard} from './auth/can-activate.authguard';
import {AuthenticationInterceptor} from './auth/authentication-interceptor';
import {MessageComponent} from './side-nav/message/message.component';
import {ApplyManageComponent} from './side-nav/apply-manage/apply-manage.component';
import {Code404Component} from './code404/code404.component';
import {AuditLabComponent} from './side-nav/audit-lab/audit-lab.component';
import {ShowNoticeComponent} from './index/show-notice/show-notice.component';
import {CardInfoComponent} from './side-nav/card-info/card-info.component';
import {NoticeComponent} from './side-nav/notice/notice.component';
import {AppendComponent} from './side-nav/append/append.component';
import {ManageComponent} from './side-nav/manage/manage.component';
import {IndexComponent} from './index/index.component';
import {NoticeFileComponent} from './index/notice-file/notice-file.component';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {RuleComponent} from './index/rule/rule.component';
import {TeachComponent} from './index/teach/teach.component';
import {NzSpinModule} from 'ng-zorro-antd/spin';

registerLocaleData(zh);
const appRoutes: Routes = [
    {
        path: '', // 默认路由
        redirectTo: '/index',
        pathMatch: 'full'
    },
    {path: 'index', component: IndexComponent},
    {path: 'login', component: LoginComponent},
    {
        path: 'sidenav', component: SideNavComponent,
        canActivate: [CanActivateAuthGuard],
        children: [
            {path: 'personalinfo', component: PersonalInfoComponent},
            {path: 'upload', component: UploadComponent},
            {path: 'card', component: CardComponent},
            {path: 'cardInfo', component: CardInfoComponent},
            {path: 'apply', component: ApplyComponent},
            {path: 'updatepassword', component: UpdatePasswordComponent},
            {path: 'message', component: MessageComponent},
            {path: 'show-notice', component: ShowNoticeComponent},
            {path: 'notice', component: NoticeComponent},
            {path: 'audit-lab', component: AuditLabComponent},
            {path: 'append', component: AppendComponent},
            {path: 'manage', component: ManageComponent},
            {path: '**', component: Code404Component},
        ],
    },
    {path: 'noticeFile', component: NoticeFileComponent},
    {path: '**', component: Code404Component}];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SideNavComponent,
        PersonalInfoComponent,
        UploadComponent,
        CardComponent,
        ApplyComponent,
        FooterComponent,
        SideCardComponent,
        UpdatePasswordComponent,
        ModalComponent,
        HasRoleDirective,
        MessageComponent,
        ApplyManageComponent,
        Code404Component,
        AuditLabComponent,
        NoticeComponent,
        ShowNoticeComponent,
        CardInfoComponent,
        AppendComponent,
        ManageComponent,
        IndexComponent,
        NoticeFileComponent,
        RuleComponent,
        TeachComponent,
    ],
    imports: [
        BrowserModule,
        // NoopAnimationsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        QuillModule.forRoot(),
        RouterModule.forRoot(appRoutes, {relativeLinkResolution: 'legacy'}),
        NzDropDownModule, NzCardModule, NzSelectModule, NzFormModule, NzInputModule, NzInputNumberModule,
        NzModalModule, NzUploadModule, NzIconModule, NzDividerModule, NzTableModule, NzButtonModule, NzTabsModule,
        NzProgressModule, NzBadgeModule, NzTagModule, NzPopconfirmModule, NzDatePickerModule, NzSliderModule,
        NzResultModule, NzMessageModule, NzNotificationModule, NzPageHeaderModule, NzDescriptionsModule,
        NzTypographyModule, NzToolTipModule, NzPipesModule, NzSpinModule

    ],
    entryComponents: [ModalComponent],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationInterceptor,
        multi: true
    }, {
        provide: NZ_I18N,
        useValue: zh_CN
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
