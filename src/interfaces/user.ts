export namespace IUser {

    export interface IUserData {
        id?: number;
        username?: string
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
    }

    export interface StateToProps {
        error: string | boolean;
        loading: boolean;
        token: string | undefined;
    }
    
    export interface DispatchFromProps {
        isLoggedIn(): Function;
        login(username?: string, password?: string): Function;
        forgotPassword(username?: string): Function;
        resetPassword(token?: string, password?: string, confirmPassword?: string): Function;
        register(userData: IUser.IUserData): Function;
        logout(): Function;
    }

}
  