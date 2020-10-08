import {Component, OnInit} from '@angular/core';
import {TeachPlan} from '../../entity/teachPlan';
import {TeachPlanService} from '../../service/teach-plan.service';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ExpFileService} from '../../service/exp-file.service';
import {LabService} from '../../service/lab.service';
import {TeacherService} from '../../service/teacher.service';
import {TeacherMsg} from '../../entity/teacher';
import {environment} from '../../../environments/environment';
import {ProjectService} from '../../service/project.service';

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

    // nz modal
    isNzModalVisible = false;
    isMsgConfirmLoading = false;

    // nz tabInfo
    tabInfo: any = {};

    fileStatusArray: Array<FileStatus>;
    fileInputName = [
        {typeName: '考勤名单'},
        {typeName: '实验任务书'},
        {typeName: '实验成绩'},
        {typeName: '评分标准表'},
        {typeName: '实验报告'}];

    searchList = '';

    filterTerm: { text: string, value: string }[] = [];
    filterTermSelected = [];
    filterCourseType = [
        {text: '必修', value: '必修'},
        {text: '选修', value: '选修'},
    ];
    filterCourseTypeSelected = [];
    teachPlans: TeachPlan[];

    classSelected: string;
    classList = [];

    constructor(private teachPlanService: TeachPlanService,
                private teacherService: TeacherService,
                private labService: LabService,
                private router: Router,
                private modalService: NzModalService,
                private expFileService: ExpFileService,
                private nzMessage: NzMessageService,
                private projectService: ProjectService,
    ) {
    }

    ngOnInit() {
        this.projectService.getTermList().subscribe(result => {
            if (result.success) {
                result.data.forEach(each => this.filterTerm.push({text: each, value: each}));
            }
        });
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
        this.fileStatusArray = new Array<FileStatus>();
        this.fileInputName.forEach(each => this.fileStatusArray.push(new FileStatus(each.typeName)));
    }

    fileDownload(fileNo: number) {
        window.location.href = this.expFileService.getFileUri(fileNo, this.tabInfo.term);
    }

    download() {
        this.teachPlanService.getTeachingPlanExcel();
    }

    filePreview(fileId: number, fileName: string) {
        const fileUrl = this.expFileService.getFileUri(fileId, this.tabInfo.term);
        const previewUrl = `${fileUrl}&fullfilename=${fileName}`;
        window.open(`${environment.filePreviewUrl}/onlinePreview?url=` + encodeURIComponent(previewUrl));
    }

    expSelect(proId: number) {
        this.projectService.getExpClass(proId).subscribe(result => {
            this.classList = result.data;
        });

    }

    classSelect() {
        this.expFileService.getFileStatus(this.tabInfo.proId, this.classSelected).subscribe(result => {
            if (result.success) {
                this.initFileStatus();
                if (result.data && result.data.files) {
                    result.data.files.forEach(each => {
                        this.fileStatusArray.forEach(file => {
                            if (each.typeName === file.typeName) {
                                file.fileName = each.name;
                                file.status = each.no;
                            }
                        });
                    });
                }
                this.nzMessage.success('获取文件关联信息成功');
            }
        });
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
        const msg = new TeacherMsg(this.tabInfo.tid, '请更新实验卡片信息', `请更新课程：${this.tabInfo.expCname} 的信息。`);
        this.teacherService.addMsgInfo(msg).subscribe(() => this.isMsgConfirmLoading = false);
    }

    downloadFilesZip() {
        this.expFileService.getFilesZip(this.tabInfo.proId, this.tabInfo.term);
    }

}

class FileStatus {
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
