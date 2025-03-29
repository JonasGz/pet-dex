import { Component } from 'pet-dex-utilities';
import { Router } from 'vanilla-routing';
import { addData } from '~src/services/localStorage';
import PetProgress from '~src/components/PetProgress';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import petCongrat from './images/petcongrat.png';

import './index.scss';

const events = ['submit'];

const html = `
  <div class='pet-finish'>
  <div class="pet-finish__progress" data-select="pet-progress"></div>
    <div class='pet-finish__container'>
      <div class='pet-finish__image' data-select='upload-image-container'>
        <img src="${petCongrat}" alt="Pet Congratulations" style="width: 20rem"/>
      </div>
      <h1 class='pet-finish__title'>Parabéns!! Seu Pet foi adicionado com sucesso!</h1>
      <strong class='pet-finish__subtitle' data-select='input-container'>O Perfil do seu bichinho foi adicionado. Veja como ficou!</strong>
    </div>
    <div class="pet-finish__footer">
      <div class='pet-finish__button' data-select='button-container'></div>
    </div>
  </div>
`;

export default function PetFinish() {
  Component.call(this, { html, events });

  const $petProgress = this.selected.get('pet-progress');
  const $buttonContainer = this.selected.get('button-container');

  this.progress = new PetProgress('Parabéns', '6');
  this.progress.mount($petProgress);

  this.button = new Button({
    text: 'Ver meus Pets',
    isFullWidth: true,
    isDisabled: false,
  });

  this.button.listen('click', () => {
    Router.go('/pets');
    window.location.reload();
  });

  this.button.mount($buttonContainer);
}

PetFinish.prototype = Object.assign(PetFinish.prototype, Component.prototype);
