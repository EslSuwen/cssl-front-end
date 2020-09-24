import {Component, OnInit} from '@angular/core';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ProjectService} from '../../service/project.service';
import {Exp, ProjectItem} from '../../enity/project';
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
    courseSelectSettings = {};
    projectItems: ProjectItem[];
    exps: Exp[]; // 实验卡片
    switch2: any;
    modalRef: MDBModalRef; // 模态
    expCardFG: FormGroup;
    id: number;
    headElements = ['课程名', '实验课程名', '仪器设备(数量)', '消耗材料(数量)', '实验总学时', '实验教材', '实验所用软件', '操作'];
    ProjectItemArray: Array<ProjectItem> = [];
    itemTitle: string;

    // 修改缓存
    editItemCache = {};
    editExpCache = {};

    // 学期列表
    termList = ['请选择学期'];
    termSelected = '请选择学期';

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
        this.courseSelectSettings = {
            singleSelection: true, // 是否单选
            text: '选择课程',
            // enableCheckAll: true, // 是否可以全选
            // selectAllText: '全选',
            // unSelectAllText: '全不选',
            enableSearchFilter: false, // 查找过滤器
            // showCheckbox: false,
            // enableFilterSelectAll: true, // “全选”复选框可以选择所有过滤结果
            // limitSelection: 5,
            // searchPlaceholderText 搜索的默认文字
        };
        // 初始化数据
        this.teacherService.getTeaches(this.authenticationService.getUserNo(), DateUtils.nowTerm())
            .subscribe(result => {
                if (result.success) {
                    for (const each of result.data) {
                        this.courseList.push({id: each.courseId, itemName: each.courseName});
                    }
                }
            });
        // 初始化实验卡片表单控制
        this.expCardFG = this.fb.group({
            courseSelected: ['', [Validators.required]],
            expCname: ['', [Validators.required]], // 实验课程名称
            expEqname: ['', [Validators.required]], // 设备
            eqnum: ['', [Validators.required, Validators.min(0), Validators.max(100)]], // 设备数量
            expMajor: ['', [Validators.required]], // 面向专业
            ssort: ['', [Validators.required]], // 学生类别
            expTime: ['', [Validators.required, Validators.min(1), Validators.max(100)]], // 实验总学时
            book: ['', [Validators.required]], // 实验教材
            software: ['', [Validators.required]], // 实验所用软件
            expTid: ['', [Validators.required]], // 教职工号
            cname: ['', [Validators.required]], // 课程名
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
            if (key === 'courseSelected') {
                continue;
            }
            exp[key] = this.expCardFG.controls[key].value;
        }
        exp.status = 'AUDITING';
        exp.labStatus = 'UNCHECK';
        exp.term = DateUtils.nowTerm();

        console.log(exp);
        console.log(this.ProjectItemArray);
        /*this.projectService.addProject(exp).subscribe(result => {
          if (!result.success) {
            return;
          }
          console.log(result.data);
          this.ProjectItemArray.map(each=>each.proId=result.data);
          this.exps.push(exp);
          this.projectService.addProjectItems(this.ProjectItemArray).subscribe();
        })*/
        this.nzMessage.success('提交成功!!!,等待管理员审核');
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
    }

    // 重用往期卡片信息
    courseSelect(item: any) {
        this.projectService.reuseCard(this.authenticationService.getUserNo(), item.id).subscribe(result => {
            if (result.success) {
                this.nzModal.confirm({
                    nzTitle: '是否导入上次开课卡片信息',
                    nzContent: '导入往期信息后仍可修改',
                    nzOnOk: () => {
                        this.expCardFG.patchValue(result.data);
                        this.projectService.getProjectItems(result.data.proId).subscribe(result => {
                            if (result.success) {
                                this.ProjectItemArray = result.data;
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
            nzContent: '确认后，窗口将在几秒后关闭，期间可以取消',
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    setTimeout(Math.random() < 0.0 ? resolve : reject, 3000);
                }).catch(() => this.onSubmit())
        });
    }

    // 学期选择后加载卡片信息
    onTermSelected() {
        console.log(this.termSelected);
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
