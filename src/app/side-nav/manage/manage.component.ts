import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../service/teacher.service';
import {Teach, Teacher} from '../../entity/teacher';
import {NzMessageService} from 'ng-zorro-antd';
import {Class} from '../../entity/class';
import {Course} from '../../entity/course';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

    teacherSet = [];
    teacherData = [];
    classSet = [];
    classData = [];
    courseSet = [];
    courseData = [];
    teachSet = [];
    teachData = [];
    editTeacherCache = {};
    editClassCache = {};
    editCourseCache = {};

    isTeachVisible = false;
    isAddTeachVisible = false;

    courseList = [];
    courseSelectedItems = [];
    teachTid;

    TnameSearchValue = '';
    classNameSearchValue = '';
    courseNameSearchValue = '';
    teachNameSearchValue = '';

    constructor(private teacherService: TeacherService, private message: NzMessageService) {
    }

    ngOnInit() {
        this.teacherService.getTeacher().subscribe(result => {
                if (result.success) {
                    this.teacherData = result.data;
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
                    this.classData = result.data;
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
                    this.courseData = result.data;
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

    saveTeacherCheck(data: Teacher) {
        if (data.tname == null || !data.tname.trim()) {
            this.message.error('姓名不能为空');
            return false;
        }
        if (data.tphone == null || !data.tphone.trim()) {
            this.message.error('手机号不能为空');
            return false;
        }
        const regex = /(^[1][3,4,5,7,8][0-9]{9}$)/;
        if (!regex.test(data.tphone)) {
            this.message.error('手机号不正确');
            return false;
        }
        return true;
    }

    saveClassCheck(data: Class) {
        if (data.className == null || !data.className.trim()) {
            this.message.error('班级名不能为空');
            return false;
        }
        if (data.studentNum != null && (data.studentNum > 100 || data.studentNum < 0)) {
            this.message.error('学生数量错误');
            return false;
        }
        return true;
    }

    saveCourseCheck(data: Course) {
        if (data.courseName == null || !data.courseName.trim()) {
            this.message.error('课程名不能为空');
            return false;
        }
        return true;
    }

    saveTeacherEdit(tid: number | string) {
        const data = this.editTeacherCache[tid].data;
        if (!this.saveTeacherCheck(data)) {
            return;
        }
        const index = this.teacherSet.findIndex(each => each.tid === tid);
        this.teacherService.updateTeacher(data).subscribe(result => {
            if (result.success) {
                this.teacherSet[index] = data;
                this.message.success(result.message);
                this.editTeacherCache[tid].edit = false;
            } else {
                this.message.error('修改失败');
            }
        });
    }

    deleteTeacher(tid: number | string) {
        this.teacherService.removeTeacher(tid).subscribe(result => {
            if (result.success) {
                this.teacherSet = this.teacherSet.filter(data => data.tid !== tid);
                this.message.success(result.message);
            } else {
                this.message.error('删除失败');
            }
        });
    }

    saveClassEdit(classId: number | string) {
        const data = this.editClassCache[classId].data;
        if (!this.saveClassCheck(data)) {
            return;
        }
        const index = this.classSet.findIndex(each => each.classId === classId);
        this.teacherService.updateClass(data).subscribe(result => {
            if (result.success) {
                this.classSet[index] = data;
                this.message.success(result.message);
                this.editClassCache[classId].edit = false;
            } else {
                this.message.error('修改失败');
            }
        });
    }

    deleteClass(classId: number | string) {
        this.teacherService.removeClass(classId).subscribe(result => {
            if (result.success) {
                this.classSet = this.classSet.filter(data => data.classId !== classId);
                this.message.success(result.message);
            } else {
                this.message.error('删除失败');
            }
        });
    }

    saveCourseEdit(courseId: number | string) {
        const data = this.editCourseCache[courseId].data;
        if (!this.saveCourseCheck(data)) {
            return;
        }
        const index = this.courseSet.findIndex(each => each.courseId === courseId);
        this.teacherService.updateCourse(data).subscribe(result => {
            if (result.success) {
                this.courseSet[index] = data;
                this.message.success(result.message);
                this.editCourseCache[courseId].edit = false;
            } else {
                this.message.error('修改失败');
            }
        });
        this.teacherService.updateCourse(this.editCourseCache[courseId].data).subscribe();
    }

    deleteCourse(courseId: number | string) {
        this.teacherService.removeCourse(courseId).subscribe(result => {
            if (result.success) {
                this.courseSet = this.courseSet.filter(data => data.courseId !== courseId);
                this.message.success(result.message);
            } else {
                this.message.error('删除失败');
            }
        });
    }

    onTeachInfo(tid: string | number) {
        this.teachTid = tid;
        this.teacherService.getTeachByTid(tid).subscribe(result => {
            if (result.success) {
                this.teachData = result.data;
                this.teachSet = result.data;
                this.isTeachVisible = true;
            }
        });
    }

    onAddTeach() {
        this.teacherService.getAvailableCourse(this.teachTid).subscribe(result => {
            if (result.success) {
                this.courseList = result.data;
                this.isAddTeachVisible = true;
            }
        });
    }

    addTeach() {
        const teaches = [];
        this.courseSelectedItems.forEach(each => teaches.push(new Teach(this.teachTid, each)));
        this.teacherService.addTeach(teaches).subscribe(result => {
            if (result.success) {
                this.courseSelectedItems = [];
                this.onTeachInfo(this.teachTid);
                this.isAddTeachVisible = false;
            }
        });
    }

    deleteTeach(courseId: number | string) {
        this.teacherService.removeTeach(this.teachTid, courseId).subscribe(result => {
            if (result.success) {
                this.teachSet = this.teachSet.filter(data => data.courseId !== courseId);
                this.message.success(result.message);
            } else {
                this.message.error('删除失败');
            }
        });
    }

    TnameSearch() {
        this.teacherSet = this.teacherData.filter((each) => each.tname.indexOf(this.TnameSearchValue) !== -1);
    }

    TnameSearchReset() {
        this.TnameSearchValue = '';
        this.teacherSet = this.teacherData;
    }

    ClassNameSearch() {
        this.classSet = this.classData.filter((each) => each.className.indexOf(this.classNameSearchValue) !== -1);
    }

    ClassNameSearchReset() {
        this.classNameSearchValue = '';
        this.classSet = this.classData;
    }

    CourseNameSearch() {
        this.courseSet = this.courseData.filter((each) => each.courseName.indexOf(this.courseNameSearchValue) !== -1);
    }

    CourseNameSearchReset() {
        this.courseNameSearchValue = '';
        this.courseSet = this.courseData;
    }

    TeachNameSearch() {
        this.teachSet = this.teachData.filter((each) => each.courseName.indexOf(this.teachNameSearchValue) !== -1);
    }

    TeachNameSearchReset() {
        this.teachNameSearchValue = '';
        this.teachSet = this.teachData;
    }
}
