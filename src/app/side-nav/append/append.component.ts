import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {Teacher} from '../../entity/teacher';
import {TeacherService} from '../../service/teacher.service';

@Component({
    selector: 'app-append',
    templateUrl: './append.component.html',
    styleUrls: ['./append.component.scss']
})
export class AppendComponent implements OnInit {

    tabIndex = 0;

    teacherValidateForm: FormGroup;

    constructor(private fb: FormBuilder, private  teacherService: TeacherService) {
    }

    ngOnInit() {
        this.teacherValidateForm = this.fb.group({
            tid: ['', [Validators.required], [this.tidNoAsyncValidator]],
            tpassword: ['', [Validators.minLength(6), Validators.maxLength(16)]],
            tname: ['', [Validators.required]],
            tphone: ['', [Validators.required], [this.phoneNoAsyncValidator]],
            authority: ['', [Validators.required, Validators.min(0), Validators.max(2)]],
            tqq: ['', [Validators.minLength(5), Validators.maxLength(12)]],
            temail: ['', [], [this.emailAsyncValidator]],
        });
    }

    teacherSubmitForm($event) {
        console.log($event);
        $event.preventDefault();
        const teacher = new Teacher();
        for (const key in this.teacherValidateForm.controls) {
            teacher[key] = this.teacherValidateForm.controls[key].value;
            this.teacherValidateForm.controls[key].markAsDirty();
            this.teacherValidateForm.controls[key].updateValueAndValidity();
        }
        if (this.teacherValidateForm.controls.tpassword.value === '') {
            teacher.tpassword = teacher.tid;
        }
        console.log(teacher);
    }

    tidNoAsyncValidator = (control: FormControl) => new Observable((observer: Observer<ValidationErrors>) => {
        setTimeout(() => {
            /** 手机号第1位肯定是1，第2位是3，4，5，7，8其中一个，剩余的9位在0-9之间 */
            const reg = /(^[1-9][0-9]{11}$)/;
            if (reg.test(control.value) === false) {
                observer.next({error: true, wrong: true});
                observer.complete();
            } else {
                this.teacherService.ifTeacher(control.value).subscribe(result => {
                    console.log(result);
                    if (result.success) {
                        observer.next({error: true, duplicated: true});
                    } else {
                        observer.next(null);
                    }
                    observer.complete();
                });
            }
        }, 500);
    })

    phoneNoAsyncValidator = (control: FormControl) => new Observable((observer: Observer<ValidationErrors>) => {
        setTimeout(() => {
            /** 手机号第1位肯定是1，第2位是3，4，5，7，8其中一个，剩余的9位在0-9之间 */
            const reg = /(^[1][3,4,5,7,8][0-9]{9}$)/;
            if (reg.test(control.value) === false) {
                observer.next({error: true, wrong: true});
            } else {
                observer.next(null);
            }
            observer.complete();
        }, 500);
    })

    emailAsyncValidator = (control: FormControl) => new Observable((observer: Observer<ValidationErrors>) => {
        setTimeout(() => {
            /** 只允许英文字母、数字、下划线、英文句号、以及中划线组成 */
            const reg = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)/;
            if (control.value === '') {
                observer.next(null);
                observer.complete();
            }
            if (reg.test(control.value) === false) {
                observer.next({error: true, wrong: true});
            } else {
                observer.next(null);
            }
            observer.complete();
        }, 500);
    })

}
