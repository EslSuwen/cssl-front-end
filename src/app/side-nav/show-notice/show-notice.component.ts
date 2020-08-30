import {Component, OnInit} from "@angular/core";
import {Notice} from "../../enity/notice";
import {NoticeService} from "../../service/notice.service";
import {NoticeFileService} from "../../service/notice-file.service";
import {NoticeFile} from "../../enity/notice-file";

@Component({
    selector: "app-show-notice",
    templateUrl: "./show-notice.component.html",
    styleUrls: ["./show-notice.component.scss"],
})
export class ShowNoticeComponent implements OnInit {
    noticePageIndex = 1;
    noticePageSize = 5;
    noticeTotal = 1;
    noticeDataSet = [];
    noticeLoading = true;
    noticeSortValue = null;
    noticeSortKey = null;

    filePageIndex = 1;
    filePageSize = 5;
    fileTotal = 1;
    fileDataSet = [];
    fileLoading = true;
    fileSortValue = null;
    fileSortKey = null;

    noticeInfoVisible = false;
    noticeInfo: Notice;
    notices: Notice[];
    files: NoticeFile[];

    filterNoticeSelected = [];
    filterFileSelected = [];
    // TODO 实现通过动态加载
    filterTname: { text: string, value: string }[] = [
        {text: '李益才', value: '李益才'},
        {text: '徐毅', value: '徐毅'},
        {text: '米波', value: '米波'},
    ];

    constructor(private noticeService: NoticeService, private noticeFileService: NoticeFileService) {
    }

    ngOnInit() {
        this.noticeService.getAllNotice().subscribe(result => {
            if (result.success) {
                this.notices = result.data;
                this.notices.forEach(each => each.noticeDate = each.noticeDate.substr(0, 10));
                this.updateNoticeData(true);
                this.noticeInfo = result.data[0];
            }
        });
        this.noticeFileService.getAll().subscribe(result => {
            if (result.success) {
                this.files = result.data;
                this.files.forEach(each => each.fileDate = each.fileDate.substr(0, 10));
                this.updateFileData(true);
            }
        })
    }

    updateNoticeData(reset: boolean = false): void {
        if (reset) {
            this.noticePageIndex = 1;
        }
        this.noticeLoading = true;
        this.noticeDataSet = this.notices;
        if (this.filterNoticeSelected.length > 0) {
            this.noticeDataSet = this.noticeDataSet.filter((each) => this.filterNoticeSelected.indexOf(each.tname) !== -1);
        }
        this.noticeTotal = this.noticeDataSet.length;
        if (this.noticeSortKey && this.noticeSortValue) {
            this.noticeDataSet = this.noticeDataSet.sort((a, b) => (this.noticeSortValue === 'ascend') ? (a[this.noticeSortKey] > b[this.noticeSortKey] ? 1 : -1)
                : (b[this.noticeSortKey] > a[this.noticeSortKey] ? 1 : -1));
        }
        this.noticeDataSet = this.noticeDataSet.slice((this.noticePageIndex - 1) * this.noticePageSize, (this.noticePageIndex - 1) * this.noticePageSize + this.noticePageSize);
        this.noticeLoading = false;
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

    noticeSort(sort: { key: string, value: string }): void {
        this.noticeSortKey = sort.key;
        this.noticeSortValue = sort.value;
        this.updateNoticeData(true);
    }

    fileSort(sort: { key: string, value: string }): void {
        this.fileSortKey = sort.key;
        this.fileSortValue = sort.value;
        this.updateFileData(true);
    }

    updateNoticeFilter(value: string[]): void {
        this.filterNoticeSelected = value;
        this.updateNoticeData(true);
    }

    updateFileFilter(value: string[]): void {
        this.filterFileSelected = value;
        this.updateFileData(true);
    }

    showNoticeInfo(nid: number) {
        this.noticeService.getNoticeById(nid).subscribe(result => {
            if (result.success) {
                this.noticeInfo = result.data;
                this.noticeInfoVisible = true;
            }
        });
    }

    fileDownLoad(fileId: string) {
        window.location.href = this.noticeFileService.getFileUri(fileId);
    }
}
