import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {MessageComponent} from './message/message.component';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
})

export class SideNavComponent implements OnInit {

    toggleFlag = true;
    userName = '';

    onToggle() {
        this.toggleFlag = (this.toggleFlag !== true);
    }

    constructor(private authenticationService: AuthenticationService) {
    }

    ngOnInit() {

        this.userName = this.authenticationService.getUserName();

    }


    logout() {
    }
}

