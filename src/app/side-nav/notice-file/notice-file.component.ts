import {Component, OnInit} from '@angular/core';
import {NoticeFileService} from '../../service/notice-file.service';
import {Notice} from '../../entity/notice';
import {NoticeFile} from '../../entity/notice-file';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-notice-file',
    templateUrl: './notice-file.component.html',
    styleUrls: ['./notice-file.component.scss']
})
export class NoticeFileComponent implements OnInit {

    filePageIndex = 1;
    filePageSize = 5;
    fileTotal = 1;
    fileDataSet = [];
    fileLoading = true;
    fileSortValue = null;
    fileSortKey = null;

    noticeInfoVisible = false;
    notices: Notice[];
    files: NoticeFile[];

    filterNoticeSelected = [];
    filterFileSelected = [];
    // TODO 实现通过动态加载
    filterTname: { text: string, value: string }[] = [];

    constructor(private noticeFileService: NoticeFileService) {
    }

    ngOnInit(): void {
        this.noticeFileService.getAll().subscribe(result => {
            if (result.success) {
                this.files = result.data;
                this.files.forEach(each => each.fileDate = each.fileDate.substr(0, 10));
                this.updateFileData(true);
            }
        });
    }

    updateFileData(reset: boolean = false): void {
        if (reset) {
            this.filePageIndex = 1;
        }
        this.fileLoading = true;
        this.fileDataSet = this.files;
        if (this.filterFileSelected.length > 0) {
            this.fileDataSet = this.fileDataSet.filter((each) => this.filterFileSelected.indexOf(each.tname) !== -1);
        }
        this.fileTotal = this.fileDataSet.length;
        if (this.fileSortKey && this.fileSortValue) {
            this.fileDataSet = this.fileDataSet.sort((a, b) => (this.fileSortValue === 'ascend') ? (a[this.fileSortKey] > b[this.fileSortKey] ? 1 : -1)
                : (b[this.fileSortKey] > a[this.fileSortKey] ? 1 : -1));
        }
        this.fileDataSet = this.fileDataSet.slice((this.filePageIndex - 1) * this.filePageSize, (this.filePageIndex - 1) * this.filePageSize + this.filePageSize);
        this.fileLoading = false;
    }

    fileSort(sort: { key: string, value: string }): void {
        this.fileSortKey = sort.key;
        this.fileSortValue = sort.value;
        this.updateFileData(true);
    }

    updateFileFilter(value: string[]): void {
        this.filterFileSelected = value;
        this.updateFileData(true);
    }

    filePreview(fileId: number, fileName: string) {
        const fileUrl = this.noticeFileService.getFileUri(fileId);
        const previewUrl = `${fileUrl}?fullfilename=${fileName}`;
        window.open(`${environment.filePreviewUrl}/onlinePreview?url=` + encodeURIComponent(previewUrl));
    }

    fileDownLoad(fileId: number) {
        window.location.href = this.noticeFileService.getFileUri(fileId);
    }

    deleteNoticeFile(fileId: string | number) {
        this.noticeFileService.remove(fileId).subscribe(result => {
            if (result.success) {
                this.files = this.files.filter(each => each.fileId != fileId);
                this.updateFileData(true);
            }
        });
    }

}
