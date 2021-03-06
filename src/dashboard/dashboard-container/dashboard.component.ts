﻿import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
// import { UserModel } from "@soushians/authentication";
import { UserModel } from "../../models";
import { Store } from "@ngrx/store";

import * as appReducer from "../../feature/feature.reducers";
// import * as authReducer from "@soushians/authentication/reducers";
// import * as authReducer from "@soushians/authentication";

@Component({
	selector: "user-dashboard-container",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.css"]
})
export class DashboardContainerComponent implements OnInit {
	user$: Observable<UserModel>;
	// is_agent : Observable<boolean>;
	constructor(private store: Store<appReducer.UserState>) {
		this.user$ = this.store.select(appReducer.getUser);
		// this.is_agent = signinService.is_agent();
	}

	ngOnInit() { }
}
