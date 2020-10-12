import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleError} from './handle-error';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {result} from '../entity/result';
import {catchError, tap} from 'rxjs/operators';
import {Notice} from '../entity/notice';

@Injectable({
    providedIn: 'root'
})
export class NoticeService extends HandleError {

    private NOTICE_API = `${environment.apiUrl}/notice`;

    constructor(private http: HttpClient) {
        super();
    }

    /**
     * @description 通过通知编号获取通知信息
     *
     * @param nid 通知编号
     * @return 通知信息
     * @author suwen
     * @date 2020/8/24 下午4:25
     */
    getNoticeById(nid: number | string): Observable<result> {
        const url = `${this.NOTICE_API}/getNoticeById`;
        if (typeof nid == 'number') {
            nid = nid.toString();
        }
        return this.http.get<result>(url, {params: {nid}}).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error(`通过通知编号获取通知信息失败，nid：${nid}`);
                }
            }),
            catchError(this.handleError<result>(`通过通知编号获取通知信息失败，nid：${nid}`))
        );
    }

    /**
     * @description 获取所有通知信息
     *
     * @return 通知信息
     * @author suwen
     * @date 2020/8/24 下午4:25
     */
    getAllNotice(): Observable<result> {
        const url = `${this.NOTICE_API}/getAllNotice`;

        return this.http.get<result>(url).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error('获取所有通知信息');
                }
            }),
            catchError(this.handleError<result>('获取所有通知信息'))
        );
    }

    /**
     * @description 通过条件查询所有通知信息
     *
     * TODO 实现条件查询
     *
     * @return 通知信息
     * @author suwen
     * @date 2020/8/24 下午4:27
     */
    getNoticeByMap(conditionMap: Map<string, object>): Observable<result> {
        const url = `${this.NOTICE_API}/getNoticeByMap`;

        return this.http.get<result>(url).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error('获取所有通知信息');
                }
            }),
            catchError(this.handleError<result>('获取所有通知信息'))
        );
    }

    /**
     * @description 增加通知信息
     *
     * @param notice 通知信息
     * @author suwen
     * @date 2020/8/24 下午4:25
     */
    addNotice(notice: Notice): Observable<result> {
        const url = `${this.NOTICE_API}/addNotice`;

        return this.http.post<result>(url, notice).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error('增加通知信息失败');
                }
            }),
            catchError(this.handleError<result>('增加通知信息失败'))
        );
    }

    /**
     * @description 修改通知信息
     *
     * @param notice 通知信息
     * @author suwen
     * @date 2020/8/24 下午4:25
     */
    updateNotice(notice: Notice): Observable<result> {
        const url = `${this.NOTICE_API}/updateNotice`;

        return this.http.put<result>(url, notice).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error('修改通知信息失败');
                }
            }),
            catchError(this.handleError<result>('修改通知信息失败'))
        );
    }

    /**
     * @description 删除通知信息
     *
     * @param nid 通知编号
     * @author suwen
     * @date 2020/8/24 下午4:25
     */
    removeNotice(nid: string | number): Observable<result> {
        const url = `${this.NOTICE_API}/removeNotice`;
        if (typeof nid == 'number') {
            nid = nid.toString();
        }

        return this.http.delete<result>(url, {params: {nid}}).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error('删除通知信息失败');
                }
            }),
            catchError(this.handleError<result>('删除通知信息失败'))
        );
    }

}
