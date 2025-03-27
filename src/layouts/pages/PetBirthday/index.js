import { Component } from 'pet-dex-utilities';
import PetImage from '~src/components/PetImage';
import { Router } from 'vanilla-routing';
import { addData } from '~src/services/localStorage';
import PetProgress from '~src/components/PetProgress';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import './index.scss';


const events = ['submit'];

const html = `
  <div class='pet-birthday'>
    <div data-select="pet-progress"></div>

    <div class='pet-birthday__container'>
      <div class='pet-birthday__image' data-select='upload-image-container'></div>
      <h1 class='pet-birthday__title'>Quantos anos tem o seu bichinho?</h1>
      <div class='pet-birthday__input' data-select='input-container'></div>
    </div>
    <div class="pet-birthday__footer">
      <div class='pet-birthday__button' data-select='button-container'></div>
    </div>
  </div>
`;

export default function PetBirthday() {
  Component.call(this, { html, events });

  const $petProgress = this.selected.get('pet-progress')
  const $inputContainer = this.selected.get('input-container');
  const $uploadImage = this.selected.get('upload-image-container');
  const $buttonContainer = this.selected.get('button-container');
  const petImage = JSON.parse(localStorage.getItem('pet'));

  this.progress = new PetProgress("Aniversário", "3");
  this.progress.mount($petProgress)

  this.input = new TextInput({
    placeholder: '12',
    type: 'number',
  });

  this.petImage = new PetImage(petImage.name.image.imageLocal);
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
    const age = this.input.getValue();
    this.emit('submit', { age });
    addData(age)
    Router.go('/pet-weight')
  });

  this.petImage.mount($uploadImage);
  this.input.mount($inputContainer);
  this.button.mount($buttonContainer);
}

PetBirthday.prototype = Object.assign(PetBirthday.prototype, Component.prototype);
