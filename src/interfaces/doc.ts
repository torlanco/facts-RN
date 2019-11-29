export namespace IDoc {

    export interface IDocData {
        id: string;
        path: string;
    }   

    export interface StateToProps {
        error: string | boolean;
        loading: boolean;
        docs: IDocData[] | undefined;    
    }
    
    export interface DispatchFromProps {
        uploadDoc(token: string, uri: any): Function;
        saveReceipt(token: string, path: string): Function;
        fetchReceipts(token: string): Function;
    }

}
  