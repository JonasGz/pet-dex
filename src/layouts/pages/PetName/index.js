import { Component } from 'pet-dex-utilities';
import { Router } from 'vanilla-routing';
import { addData } from '~src/services/localStorage';
import PetProgress from '~src/components/PetProgress';
import TextInput from '../../../components/TextInput';
import UploadImage from '../../../components/UploadImage';
import Button from '../../../components/Button';
import './index.scss';

const events = ['submit'];

const html = `
  <div class='pet-name'>
  <div class="pet-name__progress" data-select="pet-progress"></div>
    <div class='pet-name__container'>
      <div class='pet-name__image' data-select='upload-image-container'></div>
      <h1 class='pet-name__title'>Qual o nome do seu bichinho?</h1>
      <div class='pet-name__input' data-select='input-container'></div>
    </div>
    <div class="pet-name__footer">
      <div class='pet-name__button' data-select='button-container'></div>
    </div>
  </div>
`;

export default function PetName() {
  Component.call(this, { html, events });

  const $petProgress = this.selected.get('pet-progress');
  const $inputContainer = this.selected.get('input-container');
  const $uploadImage = this.selected.get('upload-image-container');
  const $buttonContainer = this.selected.get('button-container');

  this.progress = new PetProgress('Nome', '1');
  this.progress.mount($petProgress);

  this.input = new TextInput({
    placeholder: 'Nome do Pet',
  });

  this.upload = new UploadImage();
  this.button = new Button({
    text: 'Continuar',
    isFullWidth: true,
    isDisabled: false,
  });

  const updateButtonVisibility = () => {
    const input = this.input.getValue();
    const image = this.upload.getImageLocal();

    this.button.setIsDisabled(!(input && image));
  };
  updateButtonVisibility();

  this.upload.listen('value:change', updateButtonVisibility);
  this.input.listen('value:change', updateButtonVisibility);

  this.button.listen('click', async () => {
    try {
      const name = this.input.getValue();
      const imageLocal = this.upload.getImageLocal();

      if (!name || !imageLocal) {
        // eslint-disable-next-line no-alert
        alert('Por favor, preencha o nome e selecione uma imagem');
        return;
      }

      this.button.setIsDisabled(true);
      this.button.setText('Enviando...');

      const imageStorage = await this.upload.uploadImageToStorage();

      if (!imageStorage) {
        throw new Error('Falha no upload da imagem');
      }

      addData({
        image: {
          imageLocal,
          imageStorage,
        },
        name,
      });

      Router.go('/pet-race');
    } catch (error) {
      this.button.setIsDisabled(false);
      this.button.setText('Continuar');
      throw new Error(error);
    }
  });

  this.upload.mount($uploadImage);
  this.input.mount($inputContainer);
  this.button.mount($buttonContainer);
}

PetName.prototype = Object.assign(PetName.prototype, Component.prototype);
