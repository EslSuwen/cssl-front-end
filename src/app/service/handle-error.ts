import {NzMessageService} from 'ng-zorro-antd';
import {Observable, of} from 'rxjs';

/**
 * nz 消息集成异常捕获
 *
 * @author suwen
 * @date 2020/5/27 下午2:06
 */
export class HandleError {
    constructor(
        public message: NzMessageService) {
    }

    public success(message: string) {
        this.message.create('success', message);
    }

    public error(message: string) {
        this.message.create('error', message);
    }

    public handleError<T>(operation = 'operation', result?: T) {

        return (error: any): Observable<T> => {
            let msg = error.message;
            if (error.error.code !== 'undefined' && (typeof error.error.message === 'string' && error.error.message.constructor === String)) {
                msg = error.error.message;
            }
            console.error(error);
            this.error(`${operation}失败: ${msg}`);
            return of(result as T);
        };
    }
}
