import {Component, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {DateUtils} from '../../utils/DateUtils';
import {ProjectService} from '../../service/project.service';
import {AuthenticationService} from '../../service/authentication.service';
import {TeacherService} from '../../service/teacher.service';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {ExpFileService} from '../../service/exp-file.service';
import {environment} from '../../../environments/environment';
import {result} from "../../entity/result";
import {filter, map} from "rxjs/operators";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    nzProgressVisible = false;
    nzProgress = 0;

    // 学期列表
    termList = [];
    termSelected: string;

    courseList = [];
    courseSelected: string;
    courseProId: number;

    // 文件上传的控件
    fileStatusArray: Array<FileStatus>;
    fileInputName = [
        {typeName: '考勤名单'},
        {typeName: '实验任务书'},
        {typeName: '实验成绩'},
        {typeName: '评分标准表'},
        {typeName: '实验报告'}];

    formData = new Array<FormData>();

    classSelected: string;
    classList = [];

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
        this.projectService.getTermList().subscribe(result => {
            if (result.success && result.data.length > 0) {
                console.log(result);
                console.log(result.data);
                result.data.forEach(each => this.termList.push(each));
            } else {
                this.termList.push(DateUtils.nowTerm());
            }
        });
        this.initFileStatus();
    }

    initFileStatus() {
        this.fileStatusArray = new Array<FileStatus>();
        this.fileInputName.forEach(each => this.fileStatusArray.push(new FileStatus(each.typeName)));
    }

    onSubmit() {
        if (this.courseProId === undefined) {
            return this.nzMessage.error('请先选择课程！');
        }
        if (this.formData.length === 0) {
            return this.nzMessage.error('请先选择文件！');
        }
        if (this.classSelected === undefined || this.classSelected == '') {
            this.nzMessage.error('请先选择班级！');
            return;
        }

        this.nzProgressVisible = true;
        // TODO 异步变同步解决互斥
        this.fileUpload();
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
        console.log(this.classSelected);
        console.log(this.courseSelected);
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
    courseSelect(proId: any) {
        this.courseProId = proId;
        this.projectService.getExpClass(proId).subscribe(result => {
            this.classList = result.data;
        });
    }

    // 选定班级
    classSelect() {
        this.expFileService.getFileStatus(this.courseProId, this.classSelected).subscribe(result => {
            if (result.success) {
                this.initFileStatus();
                if (result.data && result.data.files) {
                    console.log(this.fileStatusArray);
                    console.log(result.data.files);
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
            } else {
                this.nzMessage.error('获取文件关联信息失败');
            }
        });
    }

    filePreview(fileId: number, fileName: string) {
        const fileUrl = this.expFileService.getFileUri(fileId, this.termSelected);
        const previewUrl = `${fileUrl}&fullfilename=${fileName}`;
        window.open(`${environment.filePreviewUrl}/onlinePreview?url=` + encodeURIComponent(previewUrl));
    }

    fileChange(typeName: string, e: any) {
        if (this.courseProId === undefined) {
            this.nzMessage.error('请先选择课程！');
            return;
        }
        if (this.classSelected === undefined || this.classSelected == '') {
            this.nzMessage.error('请先选择班级！');
            return;
        }
        const index = this.formData.findIndex(each => each.get('typeName') === typeName);
        if (index === -1) {
            const formData = new FormData();
            formData.append('typeName', typeName);
            formData.append('proId', this.courseProId.toString());
            formData.append('classId', this.classSelected);
            formData.append('file', e.file);
            this.formData.push(formData);
        } else {
            this.formData[index].set('file', e.file);
        }

        console.log(typeName);
        console.log(this.formData.length);
    }

    fileUpload() {
        const tempData = this.formData.pop();
        if (tempData !== undefined) {
            this.http.post<result>(`${environment.apiUrl}/expFile/addExpFile`, tempData, {
                reportProgress: true,
                observe: 'events'
            }).pipe(
                filter((event => {
                    switch (event.type) {
                        case HttpEventType.UploadProgress: {
                            this.nzProgress = Number(((event.loaded / event.total) * 100).toFixed(2));
                            break;
                        }
                        case HttpEventType.Response: {
                            return true;
                        }
                    }
                    return false;
                })),
                map((res: HttpResponse<any>) => res.body)
            ).subscribe(response => {
                if (response.success) {
                    this.fileUpload();
                } else {
                    this.nzMessage.error('上传文件错误！');
                    return;
                }
            });
        } else {
            this.classSelect();
            this.nzProgress = 100;
            this.nzProgressVisible = false;
            this.nzProgress = 0;
            this.nzMessage.success('上传文件成功');
            this.formData = new Array<FormData>();
        }
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
