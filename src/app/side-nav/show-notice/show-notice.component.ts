import {Component, OnInit} from "@angular/core";
import {Notice} from "../../enity/notice";
import {NoticeService} from "../../service/notice.service";

@Component({
    selector: "app-show-notice",
    templateUrl: "./show-notice.component.html",
    styleUrls: ["./show-notice.component.scss"],
})
export class ShowNoticeComponent implements OnInit {
    pageIndex = 1;
    pageSize = 5;
    total = 1;
    dataSet = [];
    loading = true;
    sortValue = null;
    sortKey = null;
    searchList = '';

    noticeInfoVisible = false;
    noticeInfo: Notice;
    notices: Notice[];

    filterTnameSelected = [];
    // TODO 实现通过动态加载
    filterTname: { text: string, value: string }[] = [
        {text: '李益才', value: '李益才'},
        {text: '徐毅', value: '徐毅'},
        {text: '米波', value: '米波'},
    ];

    constructor(private noticeService: NoticeService) {
    }

    ngOnInit() {
        this.noticeService.getAllNotice().subscribe(result => {
            if (result.success) {
                this.notices = result.data;
                console.log(result.data);
                this.updateData(true);
                this.noticeInfo = result.data[0];
            }
        })
    }

    updateData(reset: boolean = false): void {
        if (reset) {
            this.pageIndex = 1;
        }

        this.loading = true;
        this.dataSet = this.notices;
        if (this.filterTnameSelected.length > 0) {
            this.dataSet = this.dataSet.filter((each) => this.filterTnameSelected.indexOf(each.tname) !== -1);
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

    updateTnameFilter(value: string[]): void {
        this.filterTnameSelected = value;
        this.updateData(true);
    }

    showNoticeInfo(nid: number) {
        this.noticeService.getNoticeById(nid).subscribe(result => {
            if (result.success) {
                this.noticeInfo = result.data;
                this.noticeInfoVisible = true;
            }
        });
    }
}
