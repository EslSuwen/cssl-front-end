import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Teacher} from '../../entity/teacher';
import {TeacherService} from '../../service/teacher.service';
import {ArrangePeriod, Curriculum} from '../../entity/arrange';
import * as $ from 'jquery';


@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

    userName: string;

    teacher: Teacher;

    curriculumList: Curriculum[];
    arrangePeriod: ArrangePeriod;
    selectedWeek = '1';

    constructor(private authenticationService: AuthenticationService, private teacherService: TeacherService) {
    }

    ngOnInit() {
        this.initCurriculum();
        this.teacher = this.authenticationService.getCurrentUserInfo();
        this.userName = this.teacher.tname;
        this.getCurriculum(this.authenticationService.getUserNo(), '1');
    }

    getCurriculum(tid: string, week: string) {
        this.teacherService.getCurriculum(tid, week).subscribe(result => {
            console.log(result);
            this.curriculumList = result.data;
            for (const key of Object.keys(this.curriculumList)) {
                this.arrangePeriod = this.curriculumList[key].arrangePeriod;
                const i = this.arrangePeriod.labDay;
                const j = this.arrangePeriod.labSession;
                $('#table_' + i + '_' + j).html(this.curriculumList[key].cname +
                    '<br>' + this.curriculumList[key].labClass + '<br>' + this.curriculumList[key].labId +
                    '<br>' + this.curriculumList[key].campus); // 填充课表
            }
        });
    }

    searchWeek(week: string) {
        this.initCurriculum();
        this.getCurriculum(this.authenticationService.getUserNo(), week);
    }

    // 课表清空初始化
    initCurriculum() {
        for (let i = 1; i < 6; i++) {
            for (let j = 1; j < 6; j++) {
                $('#table_' + j + '_' + i).html(' '); // 初始化课表
            }
        }
    }
}
