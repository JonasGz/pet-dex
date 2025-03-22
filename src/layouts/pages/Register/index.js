import { Component } from 'pet-dex-utilities';
import { Router } from 'vanilla-routing';
import './index.scss';
import RegisterForm from '~src/components/RegisterForm';

const html = `
  <div data-select="container" class="no-pet-regirested-page">
  
  </div>;
`;

export default function Register() {
  Component.call(this, { html });

  const $container = this.selected.get('container');

  this.registerForm = new RegisterForm();

  this.registerForm.mount($container)

  this.registerForm.listen('register', () => {
    console.log('registrou')
  })
  // this.button.listen('click', () => {
  //   Router.go('/add/addpets');
  // });
}

Register.prototype = Object.assign(
  Register.prototype,
  Component.prototype,
);
