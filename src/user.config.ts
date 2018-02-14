import { InjectionToken } from "@angular/core";

export interface UserModuleConfig {
	endpoints: {
		//resetPasswordRequest: string;
		changePassword: string;
		editProfile: string;
		getUserInfo: string;
		profileInformation: string;
		// resetPassword: string;
	};
}

export const MODULE_DEFAULT_CONFIG: UserModuleConfig = {
	endpoints: {
		//resetPasswordRequest: '',
		changePassword: "",
		editProfile: "",
		getUserInfo: "",
		profileInformation: ""
		// resetPassword: '',
	}
};

export const MODULE_CONFIG_TOKEN = new InjectionToken<UserModuleConfig>("UserModuleConfig");
