
import { PayloadType, responseType } from './../App';


export const fakeApi = {
    postFakeApi(payload: PayloadType): Promise<any> {
        const promise = new Promise((res, rej) =>{
            setTimeout(() => res({status: "succes", message: "Ваше сообщение отправлено"}), 3000);
        })
     return promise
    }
};