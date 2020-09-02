import {Component, OnInit} from '@angular/core';
import {TeachPlan} from "../../enity/teachPlan";
import {TeachPlanService} from "../../service/teach-plan.service";
import {Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ExpFileService} from "../../service/exp-file.service";
import {LabService} from "../../service/lab.service";
import {LabInfo} from "../../enity/labInfo";
import {TeacherService} from "../../service/teacher.service";
import {TeacherMsg} from "../../enity/teacher";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-card-info',
    templateUrl: './card-info.component.html',
    styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    dataSet = [];
    loading = true;
    sortValue = null;
    sortKey = null;

    //nz modal
    isNzModalVisible = false;
    isMsgConfirmLoading = false;

    //nz tabInfo
    tabInfo: any = {};

    //nz tab
    tabIndex = 0;
    labInfo = new LabInfo();

    fileStatusArray: Array<fileStatus>;
    fileInputName = [
        {typeName: '考勤名单'},
        {typeName: '实验任务书'},
        {typeName: '实验成绩'},
        {typeName: '评分标准表'},
        {typeName: '实验报告'}];

    searchList = '';
    filterMajor = [
        {text: '计算机科学与技术', value: '0'},
        {text: '物联网技术', value: '1'},
        {text: '通信技术', value: '2'},
    ];
    filterClass = [
        {text: '计算机一班', value: '0'},
        {text: '计算机二班', value: '1'},
        {text: '计算机三班', value: '2'},
    ];
    filterTerm = [
        {text: '2019-2020(2)', value: '2019-2020(2)'},
        {text: '2019-2020(1)', value: '2019-2020(1)'},
        {text: '2018-2019(2)', value: '2018-2019(2)'},
        {text: '2018-2019(1)', value: '2018-2019(1)'},
    ];
    filterTermSelected = [];
    filterCourseType = [
        {text: '必修', value: '必修'},
        {text: '选修', value: '选修'},
    ];
    filterCourseTypeSelected = [];
    public planPeriod: any = {
        year: '2019-2020(1)',
    };

    teachPlans: TeachPlan[];

    constructor(private teachPlanService: TeachPlanService,
                private teacherService: TeacherService,
                private labService: LabService,
                private router: Router,
                private modalService: NzModalService,
                private expFileService: ExpFileService,
                private nzMessage: NzMessageService,
    ) {
    }

    ngOnInit() {
        this.teachPlanService.getTeachingPlan().subscribe(
            result => {
                if (result.success) {
                    this.teachPlans = result.data;
                    console.log(result.data);
                    this.updateData(true);
                }
            }
        );
        this.initFileStatus();
    }

    initFileStatus() {
        this.fileStatusArray = new Array<fileStatus>();
        this.fileInputName.forEach(each => this.fileStatusArray.push(new fileStatus(each.typeName)));
    }

    fileDownload(fileNo: number) {
        window.location.href = this.expFileService.getFileUri(fileNo, this.tabInfo.term);
    }

    filePreview(fileId: number, fileName: string) {
        let fileUrl = this.expFileService.getFileUri(fileId, this.tabInfo.term);
        let previewUrl = `${fileUrl}&fullfilename=${fileName}`
        window.open(`${environment.filePreviewUrl}/onlinePreview?url=` + encodeURIComponent(previewUrl));
    }

    expSelect(proId: number) {
        this.expFileService.getFileStatus(proId).subscribe(result => {
            if (result.success) {
                this.initFileStatus();
                if (result.data && result.data.files) {
                    result.data.files.forEach(each => {
                        this.fileStatusArray.forEach(file => {
                            if (each.typeName == file.typeName) {
                                file.fileName = each.name;
                                file.status = each.no;
                            }
                        });
                    });
                }
                this.nzMessage.success("获取文件关联信息成功");
            }
        })
        this.labService.getLabByProId(proId).subscribe(result => {
            if (result.success && result.data) {
                this.labInfo = result.data;
            }
        })
    }

    updateData(reset: boolean = false): void {
        if (reset) {
            this.pageIndex = 1;
        }

        this.loading = true;
        this.dataSet = this.teachPlans;
        if (this.searchList.length > 0) {
            this.dataSet = this.teachPlans.filter((each) => each.expMajor !== this.searchList);
            this.searchList = '';
        }
        if (this.filterTermSelected.length > 0) {
            this.dataSet = this.dataSet.filter((each) => this.filterTermSelected.indexOf(each.term) !== -1);
        }
        if (this.filterCourseTypeSelected.length > 0) {
            this.dataSet = this.dataSet.filter((each) => this.filterCourseTypeSelected.indexOf(each.courseType) !== -1);
        }
        this.total = this.dataSet.length;

        // 排序不影响条目数量
        if (this.sortKey && this.sortValue) {
            this.dataSet = this.dataSet.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortKey] > b[this.sortKey] ? 1 : -1)
                : (b[this.sortKey] > a[this.sortKey] ? 1 : -1));
        }

        this.dataSet = this.dataSet.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex - 1) * this.pageSize + this.pageSize);
        this.loading = false;
    }

    sort(sort: { key: string, value: string }): void {
        this.sortKey = sort.key;
        this.sortValue = sort.value;
        this.updateData(true);
    }

    updateTermFilter(value: string[]): void {
        this.filterTermSelected = value;
        this.updateData(true);
    }

    updateCourseTypeFilter(value: string[]): void {
        this.filterCourseTypeSelected = value;
        this.updateData(true);
    }

    showInfoModal(index: number): void {
        this.tabInfo = this.dataSet[index];
        this.isNzModalVisible = true;
        this.expSelect(this.tabInfo.proId);
    }

    handleOk(): void {
        this.isMsgConfirmLoading = true;
        let msg = new TeacherMsg(this.tabInfo.tid, '请更新实验卡片信息', `请更新课程：${this.tabInfo.expCname} 的信息。`);
        this.teacherService.addMsgInfo(msg).subscribe(r => this.isMsgConfirmLoading = false);
    }

}

class fileStatus {
    name: string;
    typeName: string;
    status: number;
    fileName: string;

    constructor(typeName: string) {
        this.name = '';
        this.typeName = typeName;
        this.status = 0;
        this.fileName = '';
    }
}
