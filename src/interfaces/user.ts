export namespace IUser {

    export interface IUserData {
        id?: number;
        username?: string
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        phone?: string;
        cpassword?: string;
        profileImage?: string;
    }

    export interface StateToProps {
        error?: string | boolean;
        loading?: boolean;
        token?: string | undefined;
        loggedInUser?: IUserData | undefined;
    }

    export interface DispatchFromProps {
        isLoggedIn(): Function;
        login(username?: string, password?: string): Function;
        requestLoginOtp(emailOrPhone?: string): Function;
        loginUsingOtp(emailOrPhone?: string, otp?: string): Function;
        forgotPassword(username?: string): Function;
        resetPassword(password?: string, confirmPassword?: string): Function;
        changePassword(currentPassword?: string, newPassword?: string, confirmPassword?: string): Function;
        requestResetPasswordOtp(phone?: string): Function;
        verifyResetPasswordOtp(phone?: string, otp?: string): Function;
        register(userData: IUser.IUserData): Function;
        fetchUserInfo(doInBackground?: boolean): Function;
        updateUserInfo(userData: IUserData): Function;
        logout(): Function;
    }
}
