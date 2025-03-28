import { Component } from 'pet-dex-utilities';
import { Router } from 'vanilla-routing';
import LoginForm from '~src/components/LoginForm';
import './index.scss';
import { login, loginWithGoogle } from '~src/services/firebase';

const html = `
  <div data-select="container" class="login-page">
  
  </div>;
`;

export default function Login() {
  Component.call(this, { html });

  const $container = this.selected.get('container');

  this.loginForm = new LoginForm();

  this.loginForm.mount($container)

  this.loginForm.listen('login', async (email, password) => {
     try {
         await login(email, password);
         Router.go('/pets');
       } catch(error) {
         throw new Error(error);
       }
  })

  this.loginForm.listen('login-google', async () => {
    try {
      await loginWithGoogle();
      Router.go('/pets');
    } catch(error) {
      throw new Error(error);
    }
  })

}

Login.prototype = Object.assign(
  Login.prototype,
  Component.prototype,
);
