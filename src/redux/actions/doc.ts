import { Types } from '@types';
import { IDoc } from '@interfaces/doc';
import { fetchReceipts, saveReceipts, uploadFile } from '@services';

const IDocAction: IDoc.DispatchFromProps = {
  uploadDoc: (token: string, uri: any, filteType?: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.UPLOAD_FILE,
      });
      try {
        let response: any = await uploadFile(token, uri, filteType);
        dispatch({
          type: Types.UPLOAD_FILE_SUCCESS,
        });
        response = await response.json();
        return response.data;
      } catch(e) {
        console.log(e);
        dispatch({
          type: Types.UPLOAD_FILE_FAILED,
        });
        return null;
      }
    };
  },
  saveReceipt: (token: string, path: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.SAVE_RECEIPTS,
      });
      try {
        const response: any = await saveReceipts(token, path);
        dispatch({
          type: Types.SAVE_RECEIPTS_SUCCESS,
        });
        return response.data.data;
      } catch(e) {
        dispatch({
          type: Types.SAVE_RECEIPTS_FAILED,
        });
        return [];
      }
    };
  },
  fetchReceipts: (token: string) => {
    return async function (dispatch: any) {
      dispatch({
        type: Types.FETCH_RECEIPTS,
      });
      try {
        const response: any = await fetchReceipts(token);
        dispatch({
          type: Types.FETCH_RECEIPTS_SUCCESS,
          payload: response.data.data.receipts,
        });
        return response.data.data.receipts;
      } catch(e) {
        dispatch({
          type: Types.FETCH_RECEIPTS_FAILED,
          payload: e,
        });
        return [];
      }
    };
  }
};

export { IDocAction as mapDispatchToProps}
