import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {Teacher} from '../../entity/teacher';
import {TeacherService} from '../../service/teacher.service';
import {Class} from '../../entity/class';
import {Course} from '../../entity/course';

@Component({
    selector: 'app-append',
    templateUrl: './append.component.html',
    styleUrls: ['./append.component.scss']
})
export class AppendComponent implements OnInit {

    teacherValidateForm: FormGroup;
    classValidateForm: FormGroup;
    courseValidateForm: FormGroup;

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
        this.classValidateForm = this.fb.group({
            classId: ['', [Validators.required], [this.classIdAsyncValidator]],
            grade: ['', [Validators.required]],
            className: ['', [Validators.required]],
            majorId: ['', [Validators.required]],
            studentNum: ['', []]
        });
        this.courseValidateForm = this.fb.group({
            courseId: ['', [Validators.required], [this.courseIdAsyncValidator]],
            courseName: ['', [Validators.required]],
            courseCollege: ['', [Validators.required]],
            courseType: ['', [Validators.required]],
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
        this.teacherService.addTeacher(teacher).subscribe(result => {
            if (result.success) {
                this.teacherValidateForm.reset();
            }
        });
    }

    classSubmitForm($event) {
        console.log($event);
        $event.preventDefault();
        const newClass = new Class();
        for (const key in this.classValidateForm.controls) {
            if (key === 'grade') {
                newClass[key] = this.classValidateForm.controls[key].value.getFullYear();
                continue;
            }
            newClass[key] = this.classValidateForm.controls[key].value;
            this.classValidateForm.controls[key].markAsDirty();
            this.classValidateForm.controls[key].updateValueAndValidity();
        }
        console.log(newClass);
        this.teacherService.addClass(newClass).subscribe(result => {
            if (result.success) {
                this.classValidateForm.reset();
            }
        });
    }

    courseSubmitForm($event) {
        console.log($event);
        $event.preventDefault();
        const course = new Course();
        for (const key in this.courseValidateForm.controls) {
            course[key] = this.courseValidateForm.controls[key].value;
            this.courseValidateForm.controls[key].markAsDirty();
            this.courseValidateForm.controls[key].updateValueAndValidity();
        }
        console.log(course);
        this.teacherService.addCurriculum(course).subscribe(result => {
            if (result.success) {
                this.courseValidateForm.reset();
            }
        });
    }

    tidNoAsyncValidator = (control: FormControl) => new Observable((observer: Observer<ValidationErrors>) => {
        setTimeout(() => {
            const reg = /(^[0-9]{12}$)/;
            if (reg.test(control.value) === false) {
                observer.next({error: true, wrong: true});
                observer.complete();
            } else {
                this.teacherService.ifTeacher(control.value).subscribe(result => {
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

    classIdAsyncValidator = (control: FormControl) => new Observable((observer: Observer<ValidationErrors>) => {
        setTimeout(() => {
            if (control.value.toString().length > 8) {
                observer.next({error: true, wrong: true});
                observer.complete();
                return;
            }
            this.teacherService.ifClass(control.value).subscribe(result => {
                if (result.success) {
                    observer.next({error: true, duplicated: true});
                } else {
                    observer.next(null);
                }
                observer.complete();
            });
        }, 500);
    })

    courseIdAsyncValidator = (control: FormControl) => new Observable((observer: Observer<ValidationErrors>) => {
        setTimeout(() => {
            this.teacherService.ifCurriculum(control.value).subscribe(result => {
                if (result.success) {
                    observer.next({error: true, duplicated: true});
                } else {
                    observer.next(null);
                }
                observer.complete();
            });
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
