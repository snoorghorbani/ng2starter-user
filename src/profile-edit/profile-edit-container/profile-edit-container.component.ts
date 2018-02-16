import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { getAppConfig } from "@soushians/config";
import { ConfigModel } from "@soushians/config";
import { UserModel, EditProfile_ApiModel } from "../../models";
import * as FeatureReducer from "../../feature/feature.reducers";

// import { DiagramService } from "app/diagram/services";

import { EditProfile } from "../edit-profile.actions";

@Component({
	selector: "profile-edit-contianer",
	template: `<profile-edit
                (submited)='updateProfile($event)'
                [formGroup]="formGroup"
                [roles]="(appConfig | async)?.Config.Roles"
                [groups]="groups | async"
              ></profile-edit>`
})
export class ProfileEditContainerComponent implements OnInit {
	userInforamation$: Observable<UserModel>;
	formGroup = EditProfile_ApiModel.Request.formGroup;
	appConfig: Observable<ConfigModel<any>>;
	groups: Observable<string[]>;
	// constructor(private diagramService: DiagramService, private store: Store<FeatureReducer.FeatureState>) {
	constructor(private store: Store<FeatureReducer.FeatureState>) {
		this.userInforamation$ = this.store.select(FeatureReducer.getUser);
		this.appConfig = this.store.select(getAppConfig);
		// TODO:
		// this.groups = this.diagramService.getGroups();
		this.groups = Observable.of([ "test1", "test2" ]);
	}

	ngOnInit() {
		this.userInforamation$.subscribe((userInfo) => {
			debugger;
			if (userInfo == null) return;
			this.formGroup.patchValue({
				Email: userInfo.Email,
				Roles: userInfo.Roles,
				Groups: userInfo.Groups
			});
		});
	}

	updateProfile(data) {
		this.store.dispatch(new EditProfile(data));
	}
}
