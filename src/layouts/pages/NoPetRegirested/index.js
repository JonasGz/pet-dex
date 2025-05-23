import { Component } from 'pet-dex-utilities';
import { Router } from 'vanilla-routing';
import Button from '~src/components/Button';
import petUrl from './images/no-pet-regirested-page.png';
import './index.scss';

const html = `
  <div data-select="container" class="no-pet-regirested-page">
    <div class="no-pet-regirested-page__content">
      <div class="no-pet-regirested-page__description">
        <h1 class="no-pet-regirested-page__title">Você ainda não tem nenhum pet cadastrado</h1>
        <p class="no-pet-regirested-page__hint">Crie o perfil do seu pet e deixe o nosso site com o focinho do seu filhote!</p>
      </div>
      <img class="no-pet-regirested-page__image" src="${petUrl}" alt="dog in an smart phone" />
    </div>
  </div>;
`;

export default function NoPetRegirested() {
  Component.call(this, { html });

  const $container = this.selected.get('container');

  this.button = new Button({
    text: 'Cadastrar pet',
    isFullWidth: true,
    isDisabled: false,
  });

  this.button.selected
    .get('button')
    .classList.add('no-pet-regirested-page__button');
  this.button.mount($container);

  this.button.listen('click', () => {
    Router.go('/pet-name');
  });
}

NoPetRegirested.prototype = Object.assign(
  NoPetRegirested.prototype,
  Component.prototype,
);
