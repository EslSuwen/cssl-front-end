import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {AuthenticationService} from '../service/authentication.service';
import {ModalComponent} from '../modal/modal.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @ViewChild('failModal', {static: true}) failing: ModalComponent;
    validationForm: FormGroup;
    authModel: any = {};
    imgUrl = `${environment.apiUrl}/api/createImageCode`;
    username: string;
    failMessage = '登录错误，请重试！';

    constructor(
        public fb: FormBuilder,
        public router: Router,
        private authenticationService: AuthenticationService,
    ) {
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
        this.authenticationService.logout();
        // 调试默认账号
        this.authModel.username = '789';
        this.authModel.password = '789';
    }

    login() {
        this.authenticationService.login(this.authModel.username, this.authModel.password, this.authModel.imgCode)
            .subscribe(result => {
                this.username = this.authenticationService.getUserName(); // 判断验证码是否输入正确
                if (result) {
                    // login successful
                    if (this.authenticationService.isLoggedIn()) {
                        this.router.navigate(['sidenav/personalinfo']).then();
                    } else {
                        this.failing.show();
                    }
                } else {
                    // login failed
                    this.failing.show();
                }
            });
    }
}
