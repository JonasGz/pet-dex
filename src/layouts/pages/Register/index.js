import { Component } from 'pet-dex-utilities';
import { Router } from 'vanilla-routing';
import './index.scss';
import RegisterForm from '~src/components/RegisterForm';
import { loginWithGoogle, register } from '~src/services/firebase';

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

    this.registerForm.listen('login-google', async () => {
      try {
        await loginWithGoogle();
        Router.go('/pets');
      } catch(error) {
        throw new Error(error);
      }
    })
}

Register.prototype = Object.assign(
  Register.prototype,
  Component.prototype,
);
