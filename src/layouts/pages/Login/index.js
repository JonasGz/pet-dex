import { Component } from 'pet-dex-utilities';
import { Router } from 'vanilla-routing';
import LoginForm from '~src/components/LoginForm';
import './index.scss';

const html = `
  <div data-select="container" class="no-pet-regirested-page">
  
  </div>;
`;

export default function Login() {
  Component.call(this, { html });

  const $container = this.selected.get('container');

  this.loginForm = new LoginForm();

  this.loginForm.mount($container)

  this.loginForm.listen('login', () => {
    console.log('logou')
  })
  // this.button.listen('click', () => {
  //   Router.go('/add/addpets');
  // });
}

Login.prototype = Object.assign(
  Login.prototype,
  Component.prototype,
);
