import HTTP from '../http';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { CONSTANTS } from '@utils';

export const fetchReceipts = (token: string) => {
    return HTTP.get('receipts', {
        headers: {
            Authorization: 'Bearer '.concat(token)
        }
    });
};

export const saveReceipts = (token: string, path: String) => {
    return HTTP.post('receipts', {
        path
    }, {
        headers: {
            Authorization: 'Bearer '.concat(token)
        }
    });
};

export const uploadFile = (token: string, uri: any, filteType?: string) => {
    if (!filteType) {
      filteType = CONSTANTS.UPLOAD_RECEIPT_TYPE;
    }
    let body = new FormData();
    body.append('file', {
        uri: uri,
        name: 'file.png',
        type: 'image/png'
    });
    body.append('type', filteType);
    return fetch(
        'https://facts-cloud.herokuapp.com/' + 'files/upload',
        {
        body,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer '.concat(token)
        }
    });
};
