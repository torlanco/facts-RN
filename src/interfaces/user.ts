export namespace IUser {

    export interface IUserData {
        id?: number;
        name?: string;
        email?: string;
    }

    export interface StateToProps {
        error: string | boolean;
        loading: boolean;
        user: IUserData | undefined;
    }
    
    export interface DispatchFromProps {
        login(email?: string, password?: string): Function;
        forgetPassword(email?: string): Function;
        register(name?: string, email?: string, password?: string): Function;
    }

}
  