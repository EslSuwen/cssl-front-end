import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from '../../service/authentication.service';
import {ModalComponent} from '../../modal/modal.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @ViewChild('failModal', {static: true}) failing: ModalComponent;
    @ViewChild('successModal', {static: true}) success: ModalComponent;
    validationForm: FormGroup;
    authModel: any = {};
    imgUrl = `${environment.apiUrl}/api/createImageCode`;
    username: string;
    failMessage = '登录错误，请重试！';

    loginVisible: boolean;

    constructor(
        public fb: FormBuilder,
        public router: Router,
        private authService: AuthenticationService) {
        this.validationForm = fb.group({
            userFormEx: [null, [Validators.required]],
            passwordFormEx: [null, Validators.required],
            codeFormEx: [null, Validators.required],
        });
    }

    get userFormEx() {
        return this.validationForm.get('userFormEx');
    }

    get passwordFormEx() {
        return this.validationForm.get('passwordFormEx');
    }

    get codeFormEx() {
        return this.validationForm.get('codeFormEx');
    }

    ngOnInit() {
        this.loginVisible = !this.authService.isLoggedIn();
        // 调试默认账号
        this.authModel.username = '789';
        this.authModel.password = '111111';
        this.username = this.authService.getUserName();
    }

    login() {
        this.authService.login(this.authModel.username, this.authModel.password, this.authModel.imgCode)
            .subscribe(result => {
                this.username = this.authService.getUserName(); // 判断验证码是否输入正确
                if (result) {
                    // login successful
                    if (this.authService.isLoggedIn()) {
                        this.loginVisible = false;
                    } else {
                        this.failing.show();
                    }
                } else {
                    // login failed
                    this.failing.show();
                }
            });
    }

    passLogin() {
        this.router.navigate(['sidenav/personalinfo']).then();
    }

    logout() {
        this.authService.logout();
        this.loginVisible = true;
    }
}
