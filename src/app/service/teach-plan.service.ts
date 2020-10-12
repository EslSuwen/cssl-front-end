import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HandleError} from './handle-error';
import {catchError, tap} from 'rxjs/operators';
import {result} from '../entity/result';

@Injectable({
    providedIn: 'root'
})
export class TeachPlanService extends HandleError {

    constructor(private http: HttpClient) {
        super();
    }

    private ARRANGE_API = `${environment.apiUrl}/arrange`;

    /**
     * @description 获取教学计划表
     *
     * @return 教学计划表
     * @author suwen
     * @date 2020/5/27 上午11:01
     */
    getTeachingPlan(): Observable<result> {
        const url = `${this.ARRANGE_API}/getTeachingPlan`;
        return this.http.get<result>(url).pipe(
            tap(response => {
                if (!response.success) {
                    this.error('获取教学计划表失败');
                }
            }),
            catchError(this.handleError<result>('获取教学计划表失败'))
        );
    }

    /**
     * 获取教学计划表 xlsx 文件下载
     *
     * @param term 学期
     */
    getTeachingPlanExcel(): void {
        window.location.href = `${this.ARRANGE_API}/getTeachingPlanExcel`;
    }
}
