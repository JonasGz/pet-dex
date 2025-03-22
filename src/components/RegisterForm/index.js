import { Component } from 'pet-dex-utilities';
import Field from './components/Field/index';
import TextInput from '../TextInput';
import Button from '../Button/index';
import {
  isNameValid,
  isEmailValid,
  isPasswordValid,
} from '../../utils/validations';
import googleIcon from './images/google-icon.svg';
import facebookIcon from './images/facebook-icon.svg';
import './index.scss';

const events = ['register'];

const html = `
    <div class="register-form">
      <h1 class="register-form__title">Crie sua petconta</h1>
      <div class="register-form__socials">
        <button class="register-form__social">
          <img class="register-form__social-img" src=${googleIcon} />
          Google
        </button>
        <button class="register-form__social">
          <img class="register-form__social-img" src=${facebookIcon} />
          Facebook
        </button>
      </div>
      <div class="register-form__divisor">
        <hr class="register-form__divisor-line">
        <span class="register-form__divisor-text">Ou</span>
        <hr class="register-form__divisor-line">
      </div>
      <form action="submit" data-select="form" class="register-form__form">
        <div class="register-form__form-fields" data-select="fields"></div>
        <div class="register-form__form-button" data-select="form-button"></div>
      </form>
    </div>
`;

export default function RegisterForm() {
  Component.call(this, { html, events });

  const $formButton = this.selected.get('form-button');
  const $fields = this.selected.get('fields');

  const name = new Field({
    label: 'Nome',
    error: 'Informe seu nome',
    content: new TextInput({
      id: 'name',
      placeholder: 'Devhat',
    }),
  });

  const email = new Field({
    label: 'E-mail',
    error: 'Informe um E-mail válido',
    content: new TextInput({
      id: 'email',
      placeholder: 'dev@devhat.com.br',
      type: 'email',
    }),
  });

  const password = new Field({
    label: 'Senha',
    error:
      'Senha inválida. Sua senha deve conter no mínimo 10 caracteres, incluindo pelo menos um caractere especial e uma letra maiúscula.',
    content: new TextInput({
      id: 'password',
      placeholder: '*********',
      type: 'password',
    }),
  });

  const repeatPassword = new Field({
    label: 'Confirmar senha',
    error: 'Senha inválida.',
    content: new TextInput({
      id: 'repeat-password',
      placeholder: '*********',
      type: 'password',
    }),
  });

  const registerButton = new Button({
    id: 'register-button',
    text: 'Cadastrar',
    isFullWidth: true,
    isDisabled: true,
  });

  name.mount($fields);
  email.mount($fields);
  password.mount($fields);
  repeatPassword.mount($fields);
  registerButton.mount($formButton);

    const validateFields = () => {
      const nameValue = name.content.selected.get('input-text').value;
      const emailValue = email.content.selected.get('input-text').value;
      const passwordValue = password.content.selected.get('input-text').value;
      const repeatPasswordValue = repeatPassword.content.selected.get('input-text').value;

  
      if (nameValue.trim() && emailValue.trim() && passwordValue && repeatPasswordValue) {
        registerButton.enable();
      } else {
        registerButton.disable();
      }
    };


    name.content.selected.get('input-text')
    .addEventListener('input', validateFields);
    email.content.selected.get('input-text')
    .addEventListener('input', validateFields);
    password.content.selected.get('input-text')
    .addEventListener('input', validateFields);
    repeatPassword.content.selected.get('input-text')
    .addEventListener('input', validateFields);

  registerButton.listen('click', async () => {
    const nameValue = name.getContent().getValue();
    const emailValue = email.getContent().getValue();
    const passwordValue = password.getContent().getValue();
    const repeatPasswordValue = repeatPassword.getContent().getValue();

    let nameValid = true;
    let emailValid = true;
    let passwordValid = true;
    let repeatPasswordValid = true;

    if (!isNameValid(nameValue)) {
      nameValid = false;

      name.showError();
      name.getContent().inputError();
    }


    if (!isEmailValid(emailValue)) {
      emailValid = false;

      email.showError();
      email.getContent().inputError();
    }

    if (!isPasswordValid(passwordValue)) {
      passwordValid = false;

      password.showError();
      password.getContent().inputError();
    }

    if (
      !isPasswordValid(repeatPasswordValue) ||
      repeatPasswordValue !== passwordValue
    ) {
      repeatPasswordValid = false;

      repeatPassword.showError();
      repeatPassword.getContent().inputError();
    }

    if (nameValid) {
      name.resolveError();
    }

    if (emailValid) {
      email.resolveError();
    }
    if (passwordValid) {
      password.resolveError();
    }

    if (repeatPasswordValid) {
      repeatPassword.resolveError();
    }


    if (
      nameValid &&
      emailValid &&
      passwordValid &&
      repeatPasswordValid
    ) {
      this.register(nameValue, emailValue, passwordValue);
    }
  });
}

RegisterForm.prototype = Object.assign(
  RegisterForm.prototype,
  Component.prototype,
  {
    register(nameValue, emailValue, passwordValue) {
      this.emit('register', nameValue, emailValue, passwordValue);
    },
  },
);
