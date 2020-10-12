import {Observable, of} from 'rxjs';

/**
 * nz 消息集成异常捕获
 *
 * @author suwen
 * @date 2020/5/27 下午2:06
 */
export class HandleError {
    constructor() {
    }

    public success(message: string) {
        console.log('success', message);
    }

    public error(message: string) {
        console.error('error', message);
    }

    public handleError<T>(operation = 'operation', result?: T) {

        return (error: any): Observable<T> => {
            let msg = error.message;
            if (error.error.code !== 'undefined'
                && (typeof error.error.message === 'string' && error.error.message.constructor === String)) {
                msg = error.error.message;
            }
            console.error(error);
            this.error(`${operation}失败: ${msg}`);
            return of(result as T);
        };
    }
}
