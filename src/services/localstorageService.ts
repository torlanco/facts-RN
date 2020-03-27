import { AsyncStorage } from 'react-native';
import { CONSTANTS } from '@utils';

class LocalStorageService {
  static _service: any;
  _token: any;

  private constructor() {}

  static getService = () => {
     if(!LocalStorageService._service) {
       LocalStorageService._service = new LocalStorageService();
     }
     return LocalStorageService._service;
  }

  setAccessToken = async (token: string) =>  {
     await AsyncStorage.setItem(CONSTANTS.FACTS_RN_AUTH_TOKEN, token);
     this._token = token;
  }

  getAccessToken = async () => {
     if (!this._token) {
       this._token = await AsyncStorage.getItem(CONSTANTS.FACTS_RN_AUTH_TOKEN);
     }
     return this._token;
  }

  clearAccessToken = async () => {
     await AsyncStorage.removeItem(CONSTANTS.FACTS_RN_AUTH_TOKEN);
     this._token = undefined;
  }
}
export { LocalStorageService };
