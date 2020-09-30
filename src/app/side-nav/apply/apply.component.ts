import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplyService} from '../../service/apply.service';
import {Exp} from '../../entity/project';
import {ProjectService} from 'src/app/service/project.service';
import {Arrange, ArrangePeriod} from '../../entity/arrange';
import {FormControl} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {AuditService} from 'src/app/service/audit.service';
import {LabService} from '../../service/lab.service';
import {DateUtils} from '../../utils/DateUtils';
import {NzMessageService} from 'ng-zorro-antd';
import {ModalComponent} from '../../modal/modal.component';
import {Class} from '../../entity/class';

@Component({
    selector: 'app-apply',
    templateUrl: './apply.component.html',
    styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
    @ViewChild('applyModal', {static: true}) applyModal: ModalComponent;
    exps: Exp[]; // 实验卡片
    applySubmit = new Arrange();
    arrangePeriod = new Array<ArrangePeriod>();
    applyIndex: number;
    // status: number;
    status = 0;
    // 周次
    weekList = [];
    weekSelectedItems = [];
    weekSettings = {};
    // 星期
    dayList = [];
    daySelectedItems = [];
    daySettings = {};
    // 节次
    timeList = [];
    timeSelectedItems = [];
    timeSettings = {};
    // 校区
    regionList = [];
    regionSelectedItems = [];
    regionSettings = {};
    // 班级
    classList = [];
    classSelectedItems = [];
    classSettings = {};
    // 年级
    gradeList = [];
    gradeSelectedItems = [];
    gradeSettings = {};

    // 实验室类型
    labTypeList = [];
    labTypeSelectedItems = [];
    labTypeSettings = {};

    // 实验室名
    labNameList = [];
    labNameSelectedItems = [];
    labNameSettings = {};
    beizhu: FormControl;

    nums = [0];

    constructor(private applyService: ApplyService,
                private projectService: ProjectService,
                private authenticationService: AuthenticationService,
                private auditService: AuditService,
                private labService: LabService,
                private messageService: NzMessageService) {
    }

    ngOnInit() {
        this.beizhu = new FormControl();
        this.projectService.getProjects(this.authenticationService.getUserNo(), DateUtils.nowTerm())
            .subscribe(result => {
                if (result.success) {
                    console.log(result.data);
                    this.exps = result.data;
                }
            });

        this.weekList = [
            {id: 1, itemName: '第一周'},
            {id: 2, itemName: '第二周'},
            {id: 3, itemName: '第三周'},
            {id: 4, itemName: '第四周'},
            {id: 5, itemName: '第五周'},
            {id: 6, itemName: '第六周'},
            {id: 7, itemName: '第七周'},
            {id: 8, itemName: '第八周'},
            {id: 9, itemName: '第九周'},
            {id: 10, itemName: '第十周'},
            {id: 11, itemName: '十一周'},
            {id: 12, itemName: '十二周'},
            {id: 13, itemName: '十三周'},
            {id: 14, itemName: '十四周'},
            {id: 15, itemName: '十五周'},
            {id: 16, itemName: '十六周'},
            {id: 17, itemName: '十七周'},
            {id: 18, itemName: '十八周'},
            {id: 19, itemName: '十九周'},
            {id: 20, itemName: '二十周'},
            {id: 21, itemName: '二十一周'},
            {id: 22, itemName: '二十二周'},
        ];
        this.weekSettings = {
            badgeShowLimit: 2,
            singleSelection: false, // 是否单选
            text: '选择周次',
            enableCheckAll: true, // 是否可以全选
            selectAllText: '全选',
            unSelectAllText: '全不选',
            enableSearchFilter: false, // 查找过滤器
            // showCheckbox: false,
            // enableFilterSelectAll: true, // “全选”复选框可以选择所有过滤结果
            // limitSelection 选择个数的限制
            // searchPlaceholderText 搜索的默认文字
        };
        this.dayList = [
            {id: '1', itemName: '星期一'},
            {id: '2', itemName: '星期二'},
            {id: '3', itemName: '星期三'},
            {id: '4', itemName: '星期四'},
            {id: '5', itemName: '星期五'},
            {id: '6', itemName: '星期六'},
            {id: '7', itemName: '星期天'},
        ];
        this.daySettings = {
            badgeShowLimit: 2,
            singleSelection: true, // 是否单选
            text: '选择星期',
            enableCheckAll: true, // 是否可以全选
            enableSearchFilter: false, // 查找过滤器
            // showCheckbox: false,
            // enableFilterSelectAll: true, // “全选”复选框可以选择所有过滤结果
            // limitSelection: 5,
            // searchPlaceholderText 搜索的默认文字
        };
        this.timeList = [
            {id: '1', itemName: '上午第一节'},
            {id: '2', itemName: '上午第二节'},
            {id: '3', itemName: '下午第一节'},
            {id: '4', itemName: '下午第二节'},
            {id: '5', itemName: '晚上第一节'},
            {id: '6', itemName: '晚上第二节'},
        ];
        this.timeSettings = {
            singleSelection: true, // 是否单选
            text: '选择节次',
            // enableCheckAll: true, // 是否可以全选
            // selectAllText: '全选',
            // unSelectAllText: '全不选',
            enableSearchFilter: false, // 查找过滤器
            // showCheckbox: false,
            // enableFilterSelectAll: true, // “全选”复选框可以选择所有过滤结果
            // limitSelection: 5,
            // searchPlaceholderText 搜索的默认文字
        };
        this.regionList = [
            {id: '双福', itemName: '双福校区'},
            {id: '南岸', itemName: '南岸校区'},
        ];
        this.regionSettings = {
            singleSelection: true, // 是否单选
            text: '选择校区',
            // enableCheckAll: true, // 是否可以全选
            // selectAllText: '全选',
            // unSelectAllText: '全不选',
            enableSearchFilter: false, // 查找过滤器
            // showCheckbox: false,
            // enableFilterSelectAll: true, // “全选”复选框可以选择所有过滤结果
            // limitSelection: 5,
            // searchPlaceholderText 搜索的默认文字
        };
        const date = new Date();
        this.gradeList = [
            {id: '1', itemName: date.getFullYear()}, // 20
            {id: '2', itemName: date.getFullYear() - 1}, // 19
            {id: '3', itemName: date.getFullYear() - 2}, // 18
            {id: '4', itemName: date.getFullYear() - 3}, // 17
            {id: '4', itemName: date.getFullYear() - 4}, // 16

        ];
        this.gradeSettings = {
            singleSelection: true, // 是否单选
            text: '选择年级',
            // enableCheckAll: true, // 是否可以全选
            // selectAllText: '全选',
            // unSelectAllText: '全不选',
            enableSearchFilter: false, // 查找过滤器
            // showCheckbox: false,
            // enableFilterSelectAll: true, // “全选”复选框可以选择所有过滤结果
            // limitSelection: 5,
            // searchPlaceholderText 搜索的默认文字
        };
        this.classList = [];
        this.classSettings = {
            badgeShowLimit: 2,
            singleSelection: false, // 是否单选
            text: '选择班级',
            enableCheckAll: true, // 是否可以全选
            selectAllText: '全选',
            unSelectAllText: '全不选',
            enableSearchFilter: false, // 查找过滤器
            // showCheckbox: false,
            // enableFilterSelectAll: true, // “全选”复选框可以选择所有过滤结果
            // limitSelection: 5,
            // searchPlaceholderText 搜索的默认文字
        };

        this.labTypeList = [
            {id: '123', itemName: '电子实验室'},
            {id: '456', itemName: '计算机实验室'},
        ];
        this.labTypeSettings = {
            singleSelection: true, // 是否单选
            text: '选择实验室类型',
            enableSearchFilter: true, // 查找过滤器
        };

        this.labNameList = [];
        this.labNameSettings = {
            singleSelection: true, // 是否单选
            text: '选择实验室',
            enableSearchFilter: true, // 查找过滤器
        };
    }

    onGradeSelected(item: any) {
        this.applyService.getClassByGrade(item.itemName).subscribe(result => {
            if (result.success) {
                this.classList = [];
                result.data.forEach(each => this.classList.push({id: each.classId, itemName: each.className}));
            }
        });
    }

    onTimeSelected() {
        console.log(this.nums);
        console.log(this.daySelectedItems);
        console.log(this.timeSelectedItems);
    }

    onCampusSelected(item: any) {
        if (this.regionSelectedItems.length === 0) {
            alert('请先选择校区！');
            this.labTypeSelectedItems = [];
            return;
        }
        this.labService.getLabByTypeCampus(item.id, this.regionList[0].id).subscribe(
            result => {
                if (result.success) {
                    console.log(result.data);
                    this.labNameList = [];
                    result.data.forEach(each => this.labNameList.push({
                        id: each.labId,
                        itemName: each.labId + each.labName
                    }));
                }
            });
    }

    addTimeSelectItem() {
        this.nums.push(this.nums.length);
    }

    removeTimeSelectItem() {
        this.nums.pop();
        this.timeSelectedItems.pop();
        this.daySelectedItems.pop();
    }

    // 提交申请
    submit() {
        if ((this.regionSelectedItems.length && this.classSelectedItems.length
            && this.weekSelectedItems.length && this.daySelectedItems.length && this.timeSelectedItems.length) !== 0) {
            // id
            this.applySubmit.proId = this.exps[this.applyIndex].proId;
            this.applySubmit.campus = this.regionSelectedItems[0].itemName;
            // 教师编号
            this.applySubmit.tid = this.authenticationService.getUserNo();
            // 实验室编号
            this.applySubmit.labId = this.labNameSelectedItems[0].id;
            // 备注
            this.applySubmit.labRemark = this.beizhu.value;
            // 实验项目名称
            this.applySubmit.expProname = this.exps[this.applyIndex].expCname;
            // 班级
            this.classSelectedItems.forEach(each => this.applySubmit.labClassInfo.push(new Class(each.id)));
            // tslint:disable-next-line: prefer-for-of
            for (let m = 0; m < this.weekSelectedItems.length; m++) {
                // 周次
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < this.daySelectedItems.length; i++) {
                    for (let j = 0; j < this.daySelectedItems[i].length; j++) {
                        // 星期
                        const a = new ArrangePeriod();
                        a.labWeek = this.weekSelectedItems[m].id;
                        a.labDay = this.daySelectedItems[i][j].id;
                        // 节次
                        a.labSession = this.timeSelectedItems[i][j].id;
                        this.arrangePeriod.push(a);
                    }
                }
            }
            this.applySubmit.arrangePeriod = this.arrangePeriod;
            console.log(this.applySubmit);
            this.applyService.addArrange(this.applySubmit).subscribe(
                result => {
                    console.log(result);
                    if (result.success) {
                        this.applyModal.hide();
                        this.messageService.success('己完成申请！');
                        this.projectService.getProjects(this.authenticationService.getUserNo(), DateUtils.nowTerm())
                            .subscribe(response => {
                                if (response.success) {
                                    this.exps = response.data;
                                }
                            });
                    } else {
                        alert(result.message);
                        this.messageService.error('增加申请出错，请联系管理员！');
                    }
                }
            );
        } else {
            alert('确保填写完整的信息哦！');
        }

        this.applySubmit = new Arrange();
        this.arrangePeriod = new Array<ArrangePeriod>();
    }
}
