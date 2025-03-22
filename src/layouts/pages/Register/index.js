import { Component } from 'pet-dex-utilities';
import { Router } from 'vanilla-routing';
import './index.scss';
import RegisterForm from '~src/components/RegisterForm';
import { register } from '~src/services/firebase';

const html = `
  <div data-select="container" class="register-page">
  
  </div>;
`;

export default function Register() {
  Component.call(this, { html });

  const $container = this.selected.get('container');

  this.registerForm = new RegisterForm();

  this.registerForm.mount($container)

  this.registerForm.listen('register', async (name, email, password) => {
    try {
      await register(name, email, password)
      Router.go('/')
    } catch(error) {
      console.error('Erro ao registrar', error)
    }
    
  })
}

Register.prototype = Object.assign(
  Register.prototype,
  Component.prototype,
);
