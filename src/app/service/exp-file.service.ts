import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd";
import {environment} from "../../environments/environment";
import {HandleError} from "./handle-error";
import {Observable} from "rxjs";
import {result} from "../enity/result";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ExpFileService extends HandleError {

    constructor(private http: HttpClient, message: NzMessageService) {
        super(message);
    }

    private FILE_API = `${environment.apiUrl}/expFile`;


    getFileUri(fileNo: number, term: string): string {
        return `${this.FILE_API}/getFile?fileNo=${fileNo}&term=${term}`;
    }

    /**
     * 增加项目实验文件
     *
     * @param formData 表单信息
     * @return 执行结果
     * @author suwen
     * @date 2020/7/8 上午10:17
     */
    addExpFile(formData: FormData): Observable<result> {
        const url = `${this.FILE_API}/addExpFile`;
        return this.http.post<result>(url, formData).pipe(
            catchError(this.handleError<result>('增加项目实验文件失败'))
        );
    }

    /**
     * 获得文件状态
     *
     * @param proId 项目编号
     * @return 文件状态
     * @author suwen
     * @date 2020/7/8 上午10:12
     */
    getFileStatus(proId: string | number): Observable<result> {
        const url = `${this.FILE_API}/getFileStatus/${proId}`;
        return this.http.get<result>(url).pipe(
            catchError(this.handleError<result>(`获得文件状态信息失败， proId：${proId}`))
        );
    }

    /**
     * 下载实验文件 zip
     *
     * @param proId 项目卡片编号
     * @param term 学期
     */
    getFilesZip(proId: string | number, term: string): void {
        window.location.href = `${this.FILE_API}/getFilesZip?proId=${proId}&term=${term}`;
    }

}
