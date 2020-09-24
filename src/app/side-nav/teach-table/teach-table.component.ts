import {TeachPlanService} from '../../service/teach-plan.service';
import {TeachPlan} from '../../enity/teachPlan';
import {Component, OnInit} from '@angular/core';
import {DateUtils} from '../../utils/DateUtils';

@Component({
    selector: 'app-teach-table',
    templateUrl: './teach-table.component.html',
    styleUrls: ['./teach-table.component.scss']
})
export class TeachTableComponent implements OnInit {
    pageIndex = 1;
    pageSize = 5;
    total = 1;
    dataSet = [];
    loading = true;
    sortValue = null;
    sortKey = null;
    selectTerm = DateUtils.nowTerm();


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

    teachPlans: TeachPlan[];

    constructor(private teachPlanService: TeachPlanService) {
    }

    ngOnInit() {
        this.teachPlanService.getTeachingPlan(DateUtils.nowTerm()).subscribe(
            result => {
                if (result.success) {
                    this.teachPlans = result.data;
                    console.log(result.data);
                    this.updateData(true);
                }
            }
        );
    }

    download() {
        this.teachPlanService.getTeachingPlanExcel(this.selectTerm);
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
}
