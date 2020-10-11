import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {HandleError} from './handle-error';
import {catchError, tap} from 'rxjs/operators';
import {result} from '../entity/result';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root'
})
export class AuditService extends HandleError {


    constructor(
        private http: HttpClient, message: NzMessageService) {
        super(message);
    }

    private PROJECT_API = `${environment.apiUrl}/project`;
    private ARRANGE_API = `${environment.apiUrl}/arrange`;

    /**
     * @description 获取待审核卡片数据
     *
     * @return 卡片数据
     * @author suwen
     * @date 2020/5/23 下午7:17
     */
    getAuditProjects(): Observable<result> {
        const url = `${this.PROJECT_API}/getAuditProject`;
        return this.http.get<result>(url).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error('获取待审核卡片数据失败');
                }
            }),
            catchError(this.handleError<result>('获取待审核卡片数据'))
        );
    }


    /**
     * @description 审核卡片
     *
     * @param proId 卡片编号
     * @param status 审核结果（1：通过；0：拒绝）
     * @return 执行结果（true: 成功；false: 失败）
     * @author suwen
     * @date 2020/5/23 下午7:19
     */
    auditProject(proId: number, status: string): Observable<result> {
        const url = `${this.PROJECT_API}/auditProject`;
        return this.http.put<result>(url, {}, {
            params: {
                proId: proId.toString(), status
            }
        }).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error(`审核卡片数据失败,proId: ${proId}, status: ${status}`);
                }
            }),
            catchError(this.handleError<result>(`审核卡片数据失败,proId: ${proId}, status: ${status}`))
        );
    }

    /**
     * @description 获取待审核实验室时间安排数据
     *
     * @return 实验室时间安排数据
     * @author suwen
     * @date 2020/5/23 下午7:17
     */
    getAuditArrange(): Observable<result> {
        const url = `${this.ARRANGE_API}/getAuditArrange`;
        return this.http.get<result>(url).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error('获取待审核实验室时间安排数据失败');
                }
            }),
            catchError(this.handleError<result>('获取待审核实验室时间安排数据'))
        );
    }

    /**
     * @description 审核实验室时间安排
     *
     * @param aid 实验室时间安排编号
     * @param status 审核结果（1：通过；0：拒绝）
     * @return 执行结果（true: 成功；false: 失败）
     * @author suwen
     * @date 2020/5/23 下午7:19
     */
    auditArrange(aid: string, status: string): Observable<result> {
        const url = `${this.ARRANGE_API}/auditArrange`;
        return this.http.put<result>(url, {}, {
            params: {aid, status}
        }).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error(`审核实验室时间安排失败，aid=: ${aid}`);
                }
            }),
            catchError(this.handleError<result>(`审核实验室时间安排失败，aid=: ${aid}`))
        );
    }

}
