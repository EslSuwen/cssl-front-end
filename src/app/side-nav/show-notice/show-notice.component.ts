import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-show-notice",
    templateUrl: "./show-notice.component.html",
    styleUrls: ["./show-notice.component.scss"],
})
export class ShowNoticeComponent implements OnInit {
    // content='<blockquote>富文本测试</blockquote><blockquote>wsqfcaq</blockquote><h2>fdgdbfjg</h2><p><span style="color: rgb(230, 0, 0);">ygjuhljnlkk</span></p><p><span style="color: rgb(230, 0, 0);">ffhhhrstjuykd</span></p><p><span style="color: rgb(230, 0, 0); background-color: rgb(0, 71, 178);">gjhkhjolihpilhijl</span></p>';
    content = '<h1>标题什么</h1><p><br></p><h2>1.舒适</h2><p>\t</p><p>\t你真棒地传代地枯藤老树昏鸦有要求艺术硕士艺术硕士艺术硕士艺术硕士艺术硕士；</p><p>\t</p><h2>2.未达标枯</h2><p><br></p><p>\t魂牵梦萦地艺术硕士艺术硕士苛</p>';

    constructor() {
    }

    ngOnInit() {
    }
}
