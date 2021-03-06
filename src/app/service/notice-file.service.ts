import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleError} from './handle-error';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {result} from '../entity/result';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NoticeFileService extends HandleError {

    private NOTICE_API = `${environment.apiUrl}/noticeFile`;

    constructor(private http: HttpClient) {
        super();
    }

    getFileUri(fileId: number): string {
        return `${this.NOTICE_API}/getFile/${fileId}`;
    }

    /**
     * @description 通过通知编号获取通知文件
     *
     * @return 通知文件id
     * @author suwen
     * @date 2020/8/24 下午4:25
     * @param fileId 文件编号
     */
    getById(fileId: number | string): Observable<result> {
        const url = `${this.NOTICE_API}/getById/${fileId}`;

        return this.http.get<result>(url).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error(`通过通知编号获取通知文件失败，fileId：${fileId}`);
                }
            }),
            catchError(this.handleError<result>(`通过通知编号获取通知文件失败，fileId：${fileId}`))
        );
    }

    /**
     * @description 获取所有通知文件
     *
     * @return 通知文件
     * @author suwen
     * @date 2020/8/24 下午4:25
     */
    getAll(): Observable<result> {
        const url = `${this.NOTICE_API}/getAll`;

        return this.http.get<result>(url).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error('获取所有通知文件');
                }
            }),
            catchError(this.handleError<result>('获取所有通知文件'))
        );
    }


    /**
     * @description 增加通知文件
     *
     * @param fileForm 文件
     * @author suwen
     * @date 2020/8/29 下午6:20
     */
    add(fileForm: FormData): Observable<result> {
        const url = `${this.NOTICE_API}/add`;

        return this.http.post<result>(url, fileForm).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error('增加通知文件失败');
                }
            }),
            catchError(this.handleError<result>('增加通知文件失败'))
        );
    }

    /**
     * @description TODO 修改通知文件
     *
     * @author suwen
     * @date 2020/8/29 下午7:24
     */
    update(): void {
    }

    /**
     * @description 删除通知文件
     *
     * @author suwen
     * @date 2020/8/24 下午4:25
     */
    remove(fileId: string | number): Observable<result> {
        const url = `${this.NOTICE_API}/remove/${fileId}`;

        return this.http.delete<result>(url).pipe(
            tap(response => {
                if (response.success) {
                    this.success(response.message);
                } else {
                    this.error('删除通知文件失败');
                }
            }),
            catchError(this.handleError<result>('删除通知文件失败'))
        );
    }

}
