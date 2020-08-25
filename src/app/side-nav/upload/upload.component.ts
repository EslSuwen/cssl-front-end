import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {DateUtils} from "../../utils/DateUtils";
import {ProjectService} from "../../service/project.service";
import {AuthenticationService} from "../../service/authentication.service";
import {TeacherService} from "../../service/teacher.service";
import {HttpClient} from "@angular/common/http";
import {ExpFileService} from "../../service/exp-file.service";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    modalRef: MDBModalRef;

    nzProgressVisible: boolean = false;
    nzProgress: number = 0;

    // 学期列表
    termList = ['请选择学期', '2019/2020(2)', '2019/2020(1)', '2018/2019(2)', '2018/2019(1)']
    termSelected = DateUtils.nowTerm();

    courseList = [];
    courseSelected: string;
    courseProId: number;
    courseSelectSettings = {};

    switch1: any;
    // 文件上传的控件

    fileStatusArray: Array<fileStatus>;
    fileInputName = [
        {typeName: '考勤名单'},
        {typeName: '实验任务书'},
        {typeName: '实验成绩'},
        {typeName: '评分标准表'},
        {typeName: '实验报告'}];

    formData = new Array<FormData>();

    constructor(
        private nzModal: NzModalService,
        private nzMessage: NzMessageService,
        private router: Router,
        private projectService: ProjectService,
        private authenticationService: AuthenticationService,
        private teacherService: TeacherService,
        public http: HttpClient,
        private expFileService: ExpFileService) {
    }

    ngOnInit(): void {
        this.courseSelectSettings = {
            singleSelection: true, // 是否单选
            text: '选择课程',
            enableSearchFilter: false, // 查找过滤器
        };
        this.initFileStatus();
        this.onTermSelected();
    }

    initFileStatus() {
        this.fileStatusArray = new Array<fileStatus>();
        this.fileInputName.forEach(each => this.fileStatusArray.push(new fileStatus(each.typeName)));
    }

    onSubmit() {
        if (this.courseProId == undefined)
            return this.nzMessage.error('请先选择课程！');
        if (this.formData.length == 0)
            return this.nzMessage.error('请先选择文件！');

        this.nzProgressVisible = true;
        this.formData.forEach(each => this.expFileService.addExpFile(each).subscribe(result => {
            if (result.success) {
                this.nzProgress += 20;
            } else {
                this.nzMessage.error('上传文件错误！');
                return;
            }
        }));
        this.delay(5000).then(r => this.nzProgress = 100);
        this.delay(6000).then(r => {
            this.courseSelect({id: this.courseProId});
            this.nzProgressVisible = false;
            this.nzProgress = 0;
            this.nzMessage.success("上传文件成功");
            this.formData = new Array<FormData>();
        });

    }

    showConfirm(): void {
        this.nzModal.confirm({
            nzTitle: '确认提交吗',
            nzContent: '提交后可覆盖',
            nzOnOk: () => this.onSubmit()
        });
    }

    // 学期选择后加载课程信息
    onTermSelected() {
        console.log(this.termSelected);
        this.projectService.getProjects(this.authenticationService.getUserNo(), this.termSelected)
            .subscribe(result => {
                if (result.success) {
                    this.courseList = [];
                    result.data.forEach(each => {
                        this.courseList.push({id: each.proId, itemName: each.expCname});
                    });
                    console.log(this.courseList);
                }
            });
    }

    // 选定课程
    courseSelect(item: any) {
        this.courseProId = item.id;
        console.log(this.courseProId);
        this.expFileService.getFileStatus(item.id).subscribe(result => {
            if (result.success) {
                this.initFileStatus();
                if (result.data && result.data.files) {
                    console.log(this.fileStatusArray);
                    console.log(result.data.files);
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
            } else {
                this.nzMessage.error("获取文件关联信息失败");
            }
        })
    }

    onCheckFile(fileNo: number) {
        window.location.href = `${environment.apiUrl}/expFile/getFile?no=${fileNo}`;
        this.nzMessage.info(`file download ${fileNo}`);
    }

    fileChange(typeName: string, e: any) {
        if (this.courseProId == undefined) {
            this.nzMessage.error('请先选择课程！');
            return;
        }
        let index = this.formData.findIndex(each => each.get('typeName') == typeName);
        if (index == -1) {
            let formData = new FormData();
            formData.append('typeName', typeName);
            formData.append('proId', this.courseProId.toString());
            formData.append('file', e.file);
            this.formData.push(formData);
        } else {
            this.formData[index].set('file', e.file);
        }

        console.log(typeName);
        console.log(this.formData.length);
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
