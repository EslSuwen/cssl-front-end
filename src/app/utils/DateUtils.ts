export class DateUtils {

    /**
     * 获得当前学期
     *
     * @author suwen
     * @date 2020/6/29 上午11:00
     */
    static nowTerm() {
        const Dates = new Date();
        const year1: number = Dates.getFullYear();
        const month = Dates.getMonth() + 1;
        let term: number;
        let year2: number;
        if (month >= 9) {
            year2 = year1 + 1;
            term = 1;
            return `${year1}-${year2}(${term})`;
        } else if (month <= 2) {
            year2 = year1 - 1;
            term = 1;
            return `${year2}-${year1}(${term})`;
        } else {
            year2 = year1 - 1;
            term = 2;
            return `${year2}-${year1}(${term})`;
        }
    }

    /**
     * 获取当前时间 格式:yyyy-MM-dd HH:MM:SS
     */
    static now(): string {
        const date = new Date();
        const month = this.zeroFill(date.getMonth() + 1);
        const day = this.zeroFill(date.getDate());
        const hour = this.zeroFill(date.getHours());
        const minute = this.zeroFill(date.getMinutes());
        const second = this.zeroFill(date.getSeconds());

        return date.getFullYear() + '-' + month + '-' + day
            + ' ' + hour + ':' + minute + ':' + second;

    }

    /**
     * 补零
     */
    static zeroFill(i) {
        if (i >= 0 && i <= 9) {
            return '0' + i;
        } else {
            return i;
        }
    }


}

