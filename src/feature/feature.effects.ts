import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import { Action } from "@ngrx/store";
import { Actions, Effect } from "@ngrx/effects";

import { SignInActionTypes } from "@soushians/authentication";

import { UserService } from "../services";
import { GetProfile } from "../profile-view";
import { map } from "rxjs/operators";

@Injectable()
export class UserEffects {
	constructor(private actions$: Actions<any>, private router: Router, private service: UserService) { }

	@Effect()
	getProfileInformation$ = this.actions$.ofType(SignInActionTypes.SIGNIN_SUCCEED)
		.pipe(
			map(() => {
				return new GetProfile();
			})
		);
}
