import { type } from "os";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fakeApi } from "./api/api";
import "./App.css";
import { Birth } from "./Components/Birth";
import { EmailText } from "./Components/EmailText";
import { MessageText } from "./Components/MessageText";
import { NameText } from "./Components/NameText";
import { NumberText } from "./Components/NumberText";

export type PayloadType = {
  nameText: string;
  emailText: string;
  numberText: string;
  birth: string;
  messageText: string;
};

export type responseType = {
  status: "succes" | "error";
  message: string;
};

function App() {
  const [nameText, setNameText] = useState("");
  const [errorNameText, setErrorNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [errorEmailText, setErrorEmailText] = useState("");
  const [numberText, setNumberText] = useState("");
  const [errorNumberText, setErrorNumberText] = useState("");
  const [birth, setBirth] = useState("");
  const [errorBirh, setErrorBirth] = useState("");
  const [messageText, setMessageText] = useState("");
  const [errorMessageText, setErrorMessageText] = useState("");
  const [response, setResponse] = useState("");
  const [isFetching, setIsfetching] = useState(false);

  const dayjs = require("dayjs");

  //Создал useEffect для того чтобы ответ пришедший из сервера через три секунды пропал
  useEffect(() => {
    if (response) {
      setTimeout(() => {
        setResponse("");
      }, 3000);
    }
  }, [response]);

  //Функции инпутов

  const onChangeNameText = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorNameText) {
      setErrorNameText("");
    }
    setNameText(e.currentTarget.value);
  };

  const onChangeEmailText = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorEmailText) {
      setErrorEmailText("");
    }
    setEmailText(e.currentTarget.value);
  };

  const onChangeNumberText = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorNumberText) {
      setErrorNumberText("");
    }
    setNumberText(e.currentTarget.value);
  };

  const onChangeBirth = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorBirh) {
      setErrorBirth("");
    }
    setBirth(e.currentTarget.value);
  };

  const onChangeMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (errorMessageText) {
      setErrorMessageText("");
    }
    setMessageText(e.currentTarget.value);
  };

  //Функции валидации

  const nameTextValidate = (
    regNameText: any,
    arrayName: Array<string>
  ): void => {
    if (arrayName.length !== 2 || arrayName[0] === "" || arrayName[1] === "") {
      setErrorNameText(
        "Поле должно состоять из имени фамилии и одного пробела между ними"
      );
    }
    arrayName.forEach((el) => {
      if (!regNameText.test(el)) {
        setErrorNameText(
          "Имя фамилия должны содержать только латинские символы"
        );
      }
      if (el.length < 3 || el.length > 30) {
        setErrorNameText(
          "Имя и фамилия не может быть короче трёх и длиннее тридцати символов"
        );
      }
    });
  };

  const emailTextValidate = (regEmail: any): void => {
    if (!regEmail.test(emailText)) {
      setErrorEmailText("Неправильный формат Email");
    }
  };

  const numberTextValidate = () => {
    if(!Number(numberText.split("/").join(""))) {
      setErrorNumberText("Номер введён не правильно")
    }
  }

  const birthValidate = (): void => {
    if (!dayjs(birth).isValid()) {
      setErrorBirth("Неверно установлен формат даты");
    }
  };

  const messageTextValidate = (): void => {
    if (messageText.length < 10) {
      setErrorMessageText("Сообщение менее десяти символов");
    }
    if (messageText.length > 300) {
      setErrorMessageText("Сообщение более 300 символов");
    }
  };


  // Главная функция в которой вызываются валидаторы и при 
  // отсутсвии ошибок  данные из формы отправляются на сервер в виде объекта

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regNameText = /^[a-zA-Z]+$/;
    const arrayName = nameText.split(" ");
    const regEmail =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    nameTextValidate(regNameText, arrayName);

    emailTextValidate(regEmail);

    numberTextValidate();

    birthValidate();

    messageTextValidate();



    if (
      arrayName.length === 2 &&
      regNameText.test(arrayName[0]) &&
      regNameText.test(arrayName[1]) &&
      arrayName[0].length > 3 &&
      arrayName[0].length < 30 &&
      arrayName[1].length > 3 &&
      arrayName[1].length < 30 &&
      regEmail.test(emailText) &&
      messageText.length > 10 &&
      messageText.length < 300 &&
      dayjs(birth).isValid() && Number(numberText.split("/").join(""))
    ) {
      const payload = { nameText, emailText, numberText, birth, messageText };
      setIsfetching(true);
      fakeApi.postFakeApi(payload).then((res) => {
        setNameText("");
        setEmailText("");
        setNumberText("");
        setBirth("");
        setMessageText("");
        setIsfetching(false);
        setResponse(String(res.message));
      });
    }
  };

  return (
    <div className="App">
      {isFetching ? (
        <div className="preloader">Loading...</div>
      ) : (
        <form onSubmit={onSubmitForm}>
          <NameText
            nameText={nameText}
            onChangeNameText={onChangeNameText}
            errorNameText={errorNameText}
          />
          <EmailText
            emailText={emailText}
            onChangeEmailText={onChangeEmailText}
            errorEmailText={errorEmailText}
          />
          <NumberText
            numberText={numberText}
            onChangeNumberText={onChangeNumberText}
            errorNumberText={errorNumberText}
          />
          <Birth
            birth={birth}
            onChangeBirth={onChangeBirth}
            errorBirth={errorBirh}
          />
          <MessageText
            messageText={messageText}
            onChangeMessageText={onChangeMessageText}
            errorMessageText={errorMessageText}
          />
          <button type="submit">Отправить</button>
        </form>
      )}
      {response && <div className="response">{response}</div>}
    </div>
  );
}

export default App;
