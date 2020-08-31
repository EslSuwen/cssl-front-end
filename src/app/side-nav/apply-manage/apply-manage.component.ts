import {Component, OnInit} from '@angular/core';
import {AuditService} from '../../service/audit.service'
import {Exp} from '../../enity/project';
import {Arrange} from '../../enity/arrange';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
    selector: 'app-apply-manage',
    templateUrl: './apply-manage.component.html',
    styleUrls: ['./apply-manage.component.scss']
})
export class ApplyManageComponent implements OnInit {

    success_get: boolean;
    exps: Exp[];
    arranges: Arrange[];
    headElements = ['实验室（中心）名称', '实验课程名', '实验设备名与数量', '实验消耗品与数量', '面向专业', '学生类别', '实验总学时', '实验教材', '实验所用软件', '教职工号', '课程名', '课程编号', '是否同意申请'];

    constructor(private auditService: AuditService, private nzMessageService: NzMessageService) {

    }

    cancel(): void {
        this.nzMessageService.info('click cancel');
    }

    confirm(): void {
        this.nzMessageService.info('click confirm');
    }

    ngOnInit() {
        //获取待审核实验室卡片数据
        this.auditService.getAuditProjects().subscribe(result => {
            if (result.success) {
                this.exps = result.data;
            }
            console.log(this.exps)
        });
        // 获取待审核实验室安排数据（这里调用API错误）
        this.auditService.getAuditArrange().subscribe(result => {
            if (result.success) {
                this.arranges = result.data;
            }
            console.log(this.arranges);
        });
    }

    auditPass(proId: number, status: string) {

        this.auditService.auditProject(proId, status).subscribe(result => {
            if (result.success) {
                this.success_get = result.data;
            }
            if (result.data) {
                this.exps = this.exps.filter(item => item.proId !== proId)
                this.nzMessageService.info('成功');
            } else {
                this.nzMessageService.info('失败');
            }
        });
    }
}
