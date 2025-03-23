import { Component } from 'pet-dex-utilities';
import PetImage from '~src/components/PetImage';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import './index.scss';
import { Router } from 'vanilla-routing';
import { addData } from '~src/services/localStorage';

const events = ['submit'];

const html = `
  <div class='pet-race'>
    <div class='pet-name__container'>
      <div class='pet-name__image' data-select='upload-image-container'></div>
      <h1 class='pet-name__title'>O que é o seu bichinho?</h1>
      <div class='pet-name__input' data-select='input-container'></div>
    </div>
    <div class="pet-name__footer">
      <div class='pet-name__button' data-select='button-container'></div>
    </div>
  </div>
`;

export default function PetRace() {
  Component.call(this, { html, events });

  const $inputContainer = this.selected.get('input-container');
  const $uploadImage = this.selected.get('upload-image-container');
  const $buttonContainer = this.selected.get('button-container');
  const petImage = JSON.parse(localStorage.getItem('pet'));

  this.input = new TextInput({
    placeholder: 'Gato',
  });

  this.petImage = new PetImage(petImage.name.image);
  this.button = new Button({
    text: 'Continuar',
    isFullWidth: true,
    isDisabled: false,
  });

  const buttonEnabled = () => {
    const input = this.input.getValue();

    this.button.setIsDisabled(!(input));
  };
  buttonEnabled();
  this.input.listen('value:change', buttonEnabled);

  this.button.listen('click', () => {
    const name = this.input.getValue();
    this.emit('submit', { name });
    addData(name)
    Router.go('/pet-birthday')
  });

  this.petImage.mount($uploadImage);
  this.input.mount($inputContainer);
  this.button.mount($buttonContainer);
}

PetRace.prototype = Object.assign(PetRace.prototype, Component.prototype);
