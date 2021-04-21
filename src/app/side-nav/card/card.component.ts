import {Component, OnInit} from '@angular/core';
import {MDBModalService} from 'angular-bootstrap-md';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ProjectService} from '../../service/project.service';
import {Exp, ProjectItem} from '../../entity/project';
import {AuthenticationService} from '../../service/authentication.service';
import {TeacherService} from '../../service/teacher.service';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {Router} from '@angular/router';
import {DateUtils} from '../../utils/DateUtils';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    nowTerm = DateUtils.nowTerm();
    confirmModal: NzModalRef;
    // 设置模态框的参数
    addItemVisible = false;
    addItemNum = 1; // 增加表格的行数
    courseList = [];
    courseSelected: any;
    projectItems: ProjectItem[];

    exps: Exp[] = []; // 实验卡片
    switch2: any;
    expCardFG: FormGroup;
    id: number;
    headElements = ['课程名', '实验课程名', '仪器设备', '消耗材料', '学时', '教材', '软件'];
    ProjectItemArray: Array<ProjectItem> = [];
    itemTitle: string;

    // 修改缓存
    editItemCache = {};
    editExpCache = {};

    // 学期列表
    termList = ['请选择学期'];
    termSelected = '请选择学期';

    classSelectedItems = [];
    classList = [];

    constructor(private fb: FormBuilder,
                private modalService: MDBModalService,
                private projectService: ProjectService,
                private authenticationService: AuthenticationService,
                private teacherService: TeacherService,
                private nzModal: NzModalService,
                private nzMessage: NzMessageService,
                public router: Router
    ) {
    }

    ngOnInit() {
        this.projectService.getTermList().subscribe(result => {
            if (result.success && result.data.length > 0) {
                console.log(result);
                console.log(result.data);
                result.data.forEach(each => this.termList.push(each));
            } else {
                this.termList.push(DateUtils.nowTerm());
            }
        });
        // 初始化数据
        this.teacherService.getTeaches(this.authenticationService.getUserNo(), DateUtils.nowTerm())
            .subscribe(result => {
                if (result.success) {
                    for (const each of result.data) {
                        this.courseList.push({courseId: each.courseId, courseName: each.courseName});
                    }
                }
            });
        this.teacherService.getClass().subscribe(result => {
            if (result.success) {
                this.classList = result.data;
            }
        });
        // 初始化实验卡片表单控制
        this.expCardFG = this.fb.group({
            courseId: ['', [Validators.required]],
            expCname: ['', [Validators.required]], // 实验课程名称
            expEqname: ['', [Validators.required]], // 设备
            eqnum: ['', [Validators.required, Validators.min(0), Validators.max(100)]], // 设备数量
            expTime: ['', [Validators.required, Validators.min(1), Validators.max(100)]], // 实验总学时
            book: ['', [Validators.required]], // 实验教材
            software: ['', [Validators.required]], // 实验所用软件
            conName: ['', [Validators.required]], // 消耗材料名称
            conNum: ['', [Validators.required, Validators.min(0), Validators.max(100)]], // 消耗材料数量
        });

        this.ProjectItemArray.push(new ProjectItem());
    }

    onSubmit() {
        if (this.expCardFG.invalid) {
            this.nzMessage.error('请检查信息是否填写正确！');
            return;
        }
        const exp = new Exp();
        for (const key in this.expCardFG.controls) {
            exp[key] = this.expCardFG.controls[key].value;
        }
        exp.labStatus = 'UNCHECK';
        exp.term = DateUtils.nowTerm();
        exp.expTid = this.authenticationService.getUserNo();

        console.log(exp);
        console.log(this.ProjectItemArray);
        console.log(this.classSelectedItems);
        this.projectService.addProject(exp).subscribe(result => {
            if (!result.success) {
                this.nzMessage.error('实验卡片上传失败！');
                return;
            }
            console.log(result.data);
            this.ProjectItemArray.map(each => each.proId = result.data.proId);
            const expClass = [];
            this.classSelectedItems.forEach(each => expClass.push({proId: result.data.proId, classId: each}));
            this.projectService.addExpClass(expClass).subscribe();
            if (this.ProjectItemArray.length !== 0) {
                this.projectService.addProjectItems(this.ProjectItemArray).subscribe();
            }
            this.onTermSelected();
        });
        this.nzMessage.success('提交成功!');
        this.switch2 = false;
    }


    // 响应式更新 expItem 数据
    loadProjectItems(proId: number) {
        this.projectService.getProjectItems(proId)
            .subscribe(result => {
                if (result.success) {
                    this.projectItems = result.data;
                    this.updateItemEditCache();
                }
            });
        this.projectService.getExpClass(proId).subscribe(result => {
            if (result.success) {
                this.classSelectedItems = [];
                result.data.forEach(each => this.classSelectedItems.push(each.classId));
            }
        });
    }

    // 重用往期卡片信息
    courseSelect(courseId: any) {
        console.log(courseId);
        this.courseSelected = courseId;
        this.projectService.reuseCard(this.authenticationService.getUserNo(), courseId).subscribe(result => {
            if (result.success) {
                this.nzModal.confirm({
                    nzTitle: '是否导入上次开课卡片信息',
                    nzContent: '导入往期信息后仍可修改',
                    nzOnOk: () => {
                        this.expCardFG.patchValue(result.data);
                        this.projectService.getProjectItems(result.data.proId).subscribe(response => {
                            if (response.success) {
                                this.ProjectItemArray = response.data;
                                this.nzMessage.success('导入成功！');
                            }
                        });
                    }
                });
            }
        });
    }

    confirmAddItem(): void {
        for (let i = 0; i < this.addItemNum; i++) {
            this.ProjectItemArray.push(new ProjectItem());
        }
    }

    // 确认提交的模态框
    showConfirm(): void {
        this.confirmModal = this.nzModal.confirm({
            nzTitle: '确认提交吗',
            nzContent: '请确定信息填写正确！',
            nzOnOk: () => this.onSubmit()
        });
    }

    // 学期选择后加载卡片信息
    onTermSelected() {
        this.classSelectedItems = [];
        this.projectItems = [];
        this.projectService.getProjects(this.authenticationService.getUserNo(), this.termSelected)
            .subscribe(result => {
                if (result.success) {
                    this.exps = result.data;
                    this.updateExpEditCache();
                }
            });
    }

    // 保存实验
    saveItemEdit(ino: number): void {

        if (!this.saveItemCheck(this.editItemCache[ino].data)) {
            return;
        }

        this.projectService.updateItem(this.editItemCache[ino].data).subscribe(result => {
            if (result.success) {
                this.projectItems.forEach(each => {
                    if (each.ino === ino) {

                        each = this.editItemCache[ino].data;
                    }
                });
                this.nzMessage.success('修改成功');
            } else {
                this.nzMessage.error('修改失败');
            }
        });
        this.editItemCache[ino].edit = false;
    }

    saveItemCheck(data: any): boolean {

        if (data.iid == null || !data.iid.trim()) {
            this.nzMessage.error('实验项目编号不能为空');
            return false;
        }

        if (data.iname == null || !data.iname.trim()) {
            this.nzMessage.error('实验项目名称不能为空');
            return false;
        }

        if (data.itype == null || !data.itype.trim()) {
            this.nzMessage.error('实验项目类型不能为空');
            return false;
        }

        return true;
    }

    deleteItem(ino: number) {
        this.projectService.deleteItem(ino.toString()).subscribe(resutl => {
            if (resutl.success) {
                this.nzMessage.success('删除成功！');
            } else {
                this.nzMessage.error('删除失败！');
            }
        });
    }

    updateItemEditCache(edit: boolean = false): void {
        this.projectItems.forEach(item => {
            if (!this.editItemCache[item.ino]) {
                this.editItemCache[item.ino] = {
                    edit,
                    data: item
                };
            }
        });
    }

    saveExpEdit(proId: number): void {
        if (!this.saveExpCheck(this.editExpCache[proId].data)) {
            return;
        }

        this.projectService.updateExp(this.editExpCache[proId].data).subscribe(result => {
            if (result.success) {
                this.exps.forEach(each => {
                    if (each.proId === proId) {
                        each = this.editExpCache[proId].data;
                    }
                });
                this.nzMessage.success('修改成功');
            } else {
                this.nzMessage.error('修改失败');
            }
        });
        this.editExpCache[proId].edit = false;
    }

    saveExpCheck(data: any): boolean {
        if (data.expCname == null || !data.expCname.trim()) {
            this.nzMessage.error('实验课程名不能为空');
            return false;
        }
        return true;
    }

    deleteExp(proId: number) {
        this.projectService.deleteExp(proId.toString()).subscribe(result => {
            if (result.success) {
                this.nzMessage.success('删除成功！');
            } else {
                this.nzMessage.error('删除失败！');
            }
        });
    }

    updateExpEditCache(edit: boolean = false): void {
        this.exps.forEach(item => {
            if (!this.editExpCache[item.proId]) {
                this.editExpCache[item.proId] = {
                    edit,
                    data: item
                };
            }
        });
    }
}
