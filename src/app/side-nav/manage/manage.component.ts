import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../service/teacher.service';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

    teacherSet = [];
    classSet = [];
    courseSet = [];
    editTeacherCache = {};
    editClassCache = {};
    editCourseCache = {};

    constructor(private teacherService: TeacherService) {
    }

    ngOnInit() {
        this.teacherService.getTeacher().subscribe(result => {
                if (result.success) {
                    this.teacherSet = result.data;
                    this.teacherSet.forEach(item => {
                        if (!this.editTeacherCache[item.tid]) {
                            this.editTeacherCache[item.tid] = {
                                edit: false,
                                data: item
                            };
                        }
                    });
                }
            }
        );
        this.teacherService.getClass().subscribe(result => {
                if (result.success) {
                    this.classSet = result.data;
                    this.classSet.forEach(item => {
                        if (!this.editClassCache[item.classId]) {
                            this.editClassCache[item.classId] = {
                                edit: false,
                                data: item
                            };
                        }
                    });
                }
            }
        );
        this.teacherService.getCourse().subscribe(result => {
                if (result.success) {
                    this.courseSet = result.data;
                    this.courseSet.forEach(item => {
                        if (!this.editCourseCache[item.courseId]) {
                            this.editCourseCache[item.courseId] = {
                                edit: false,
                                data: item
                            };
                        }
                    });
                }
            }
        );
    }

    saveTeacherEdit(tid: number | string) {
        console.log(this.editTeacherCache[tid]);
        console.log(tid);
    }

    deleteTeacher(tid: number | string) {
        console.log(tid);
    }

    saveClassEdit(classId: number | string) {
        console.log(this.editClassCache[classId]);
        console.log(classId);
    }

    deleteClass(classId: number | string) {
        console.log(classId);
    }

    saveCourseEdit(courseId: number | string) {
        console.log(this.editCourseCache[courseId]);
        console.log(courseId);
    }

    deleteCourse(courseId: number | string) {
        console.log(courseId);
    }
}
