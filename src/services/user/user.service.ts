import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

import { UserModel, EditProfile_ApiModel, ProfileViewModel, FailedLoginReportModel } from "../../models";
import { UserConfigurationService } from "../../services/user-module-configuration";
import { Store } from "@ngrx/store";

import * as userReducers from "../../feature/feature.reducers";
import { GetProfile } from "../../profile-view/profile-view.actions";
import { stringTemplate } from "@soushians/infra";

@Injectable()
export class UserService {
	responseCache: ProfileViewModel.Response;

	constructor(
		private http: HttpClient,
		private store: Store<userReducers.FeatureState>,
		private configurationService: UserConfigurationService
	) {
		setTimeout(() => {
			this.store.dispatch(new GetProfile());
		}, 999);
	}

	getProfileInformation(): Observable<ProfileViewModel.Response> {
		return this.configurationService.config$
			.filter((config) => config.endpoints.profileInformation != "")
			.take(1)
			.switchMap((config) => this.http.get(config.endpoints.profileInformation))
			.map((response: UserModel) => response);
	}
	editProfile(data: EditProfile_ApiModel.Request): Observable<UserModel> {
		var model = new EditProfile_ApiModel.Request(data);
		return this.http
			.put(stringTemplate(this.configurationService.config.endpoints.editProfile, model), model.getRequestBody())
			.map((response: EditProfile_ApiModel.Response) =>
				new EditProfile_ApiModel.Response(response).extractData()
			);
	}
	getInfo(data: ProfileViewModel.Request): Observable<any> {
		const model = new ProfileViewModel.Request(data);

		if (this.responseCache && this.responseCache.Email == model.Email) return Observable.of(this.responseCache);
		return this.http
			.get(stringTemplate(this.configurationService.config.endpoints.getUserInfo, model))
			.do((response: ProfileViewModel.Response) => (this.responseCache = response))
			.map((response) => response);
	}
}
