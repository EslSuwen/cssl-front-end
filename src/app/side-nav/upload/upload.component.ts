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
import {result} from '../../entity/result';
import {filter, map} from 'rxjs/operators';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {Base64} from 'js-base64';

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

    uploading = false;
    fileList: NzUploadFile[] = [];

    // 文件上传的控件
    fileStatusArray: Array<FileStatus>;
    fileInputName = [
        {typeId: 0, typeName: '考勤名单'},
        {typeId: 1, typeName: '实验任务书'},
        {typeId: 2, typeName: '实验成绩'},
        {typeId: 3, typeName: '实验报告'},
        {typeId: 4, typeName: '评分标准表'}];

    formDataList = new Array<FormData>();

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
        this.projectService.getTermList().subscribe(res => {
            if (res.success && res.data.length > 0) {
                console.log(res);
                console.log(res.data);
                res.data.forEach(each => this.termList.push(each));
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
        if (this.formDataList.length === 0) {
            return this.nzMessage.error('请先选择文件！');
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
            .subscribe(res => {
                if (res.success) {
                    this.courseList = [];
                    res.data.forEach(each => {
                        this.courseList.push({id: each.proId, itemName: each.expCname});
                    });
                    console.log(this.courseList);
                    this.nzMessage.success('获取文件关联信息成功');
                } else {
                    this.nzMessage.error('获取文件关联信息失败');
                }
            });
    }

    // 选定课程
    courseSelect(proId: any) {
        this.courseProId = proId;
        this.expFileService.getFileStatus(this.courseProId).subscribe(res => {
            if (res.success) {
                this.initFileStatus();
                if (res.data) {
                    console.log(this.fileStatusArray);
                    console.log(res.data);
                    res.data.forEach(each => {
                        this.fileStatusArray.forEach(file => {
                            if (each.typeName === file.typeName) {
                                file.fileName = each.fileName;
                                file.status = each.fileId;
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
        const fileUrl = this.expFileService.getFileUri(fileId, this.termSelected) + `&fullfilename=${fileName}`;
        window.open(`${environment.filePreviewUrl}/onlinePreview?url=` + encodeURIComponent(Base64.encode(fileUrl)));
    }

    fileUpload() {
        // TODO 使用 each 遍历
        const tempData = this.formDataList.pop();
        if (tempData != undefined) {
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
                    this.remove(tempData.get('fileType').toString());
                    this.fileUpload();
                } else {
                    this.nzMessage.error('上传文件错误！');
                    return;
                }
            });
        } else {
            this.courseSelect(this.courseProId);
            this.nzProgress = 100;
            this.nzProgressVisible = false;
            this.nzProgress = 0;
            this.nzMessage.success('上传文件成功');
            this.formDataList = new Array<FormData>();
        }
    }

    getUpload(typeId: string, e: any) {
        if (this.courseProId === undefined) {
            this.nzMessage.error('请先选择课程！');
            this.remove(typeId);
            return;
        }
        this.formDataList = this.formDataList.filter(each => each.get('fileType') != typeId);
        const formData = new FormData();
        formData.append('fileType', typeId);
        formData.append('proId', this.courseProId.toString());
        formData.append('file', e.target.files[0]);
        this.formDataList.push(formData);
    }

    remove(typeId: string) {
        const upload = document.getElementById(`newUpload${typeId}`) as HTMLInputElement;
        // @ts-ignore
        this.formDataList = this.formDataList.filter(each => each.get('fileType') != typeId);
        upload.value = null;
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
