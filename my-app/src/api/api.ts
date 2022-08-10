import { PayloadType } from "./../App";

// здесь создал имитацию отправки пост запроса на сервер, для того чтобы получить 
//статус error необходимо в текстовом поле отправить только числовые значения без букв

export const fakeApi = {
  postFakeApi(payload: PayloadType): Promise<any> {
    const promise = new Promise((res, rej) => {
      if (!Number(payload.messageText)) {
        setTimeout(
          () => res({ status: "succes", message: "Ваше сообщение отправлено" }),
          3000
        );
      } else {
        setTimeout(
          () => rej({ status: "error", message: "Произошла ошибка" }),
          3000
        );
      }
    });
    return promise;
  },
};
