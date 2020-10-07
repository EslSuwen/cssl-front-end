import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {TeacherService} from "../../service/teacher.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalComponent} from '../../modal/modal.component';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss'],

})
export class UpdatePasswordComponent implements OnInit {

    @ViewChild('demoBasic1', {static: true}) modal1: ModalComponent; //修改成功模态
    @ViewChild('demoBasic2', {static: true}) modal2: ModalComponent; //修改失败的模态
    oldPw = '';
    newPw: '';
    case1 = 2;
    newPw1: string;
    isClick: boolean;//判断却认更改的两次密码是否相同
    element: FormGroup;//表单验证
    createBasicNotification(): void {
        this.notification.blank(
            '消息提示',
            '密码修改成功，请输入新密码',
            {nzDuration: 0}
        );
    }

    constructor(private authenticationService: AuthenticationService,
                private teacherService: TeacherService,
                public router: Router, private notification: NzNotificationService
    ) {
    }

    ngOnInit() {
        console.log(this.newPw1 == this.newPw);
        this.element = new FormGroup({
            oldPw: new FormControl(null, Validators.required),
        })
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    updatePassword() {
        this.click1();
        if (this.isClick) {
            if (this.newPw != this.newPw1) {
                alert("两次输入的密码不相同");
            } else {
                this.teacherService.updatePassword(this.authenticationService.getUserNo(), this.oldPw, this.newPw).subscribe(result => {
                    if (result) { //修改成功
                        this.case1 = 1;
                        this.showAndHideModal_success();
                        this.createBasicNotification();
                    } else {
                        this.case1 = -1;
                        //原密码输入错误
                        this.showAndHideModa_fail();
                    }
                });
            }
        }
    }

    showAndHideModal_success() {   //显示修改成功的模态
        this.modal1.show();
    }

    showAndHideModa_fail() {   //登录修改显示的模态
        this.modal2.show();
    }

    click1() {
        this.isClick = true;
    }

    successUpdate() {  //输入正确，确认进入
        this.router.navigate(['login']);
    }
}

