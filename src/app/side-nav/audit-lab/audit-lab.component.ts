import {Component, OnInit} from '@angular/core';
import {ArrangeAudit} from "../../enity/arrange";
import {AuditService} from "../../service/audit.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: 'app-audit-lab',
    templateUrl: './audit-lab.component.html',
    styleUrls: ['./audit-lab.component.scss']
})
export class AuditLabComponent implements OnInit {

    arrangeAudit: ArrangeAudit[];
    headElements = ['实验室编号', '实验室名', '实验室校区', '班级', '所属课程', '任课教师名', '实验项目名称', '排课周期', '排课时间', '备注', '是否同意申请'];

    constructor(private auditService: AuditService, private nzMessageService: NzMessageService) {

    }

    cancel(): void {
        this.nzMessageService.info('click cancel');
    }

    confirm(): void {
        this.nzMessageService.info('click confirm');
    }

    ngOnInit() {
        // 获取待审核实验室安排数据
        this.auditService.getAuditArrange().subscribe(result => {
            if (result.success) {
                this.arrangeAudit = result.data;
            }
            console.log(this.arrangeAudit);
        });
    }

    auditPass(aid: number, status: string) {

        this.auditService.auditArrange(aid.toString(), status).subscribe(result => {
            if (result.success) {
                this.arrangeAudit = this.arrangeAudit.filter(item => item.aid !== aid)
                this.nzMessageService.info('成功');
            } else {
                this.nzMessageService.info('失败');
            }
        });
    }

}
