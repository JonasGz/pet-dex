import { Component } from 'pet-dex-utilities';
import './index.scss';
import { uploadFileToStorage } from '~src/services/firebase';
import placeholderImage from './img/placeholder.svg';
import plusIcon from './img/plus-icon.svg';
import photoIcon from './img/photo-icon.svg';

const events = [
  'value:change',
  'upload:start',
  'upload:complete',
  'upload:error',
];

const html = `
  <div class="container-upload-image">
    <div class="container-upload-image__animation">
      <div class="container-upload-image__circle"></div>
      <div class="container-upload-image__circle-duplicate"></div>
    </div>
    <label for="input-file" class="container-upload-image__label">
      <div class="container-upload-image__image-container">
        <img class="container-upload-image__placeholder-image" src="${placeholderImage}" alt="Placeholder">
        <img class="container-upload-image__preview-image hidden" data-select="image-preview" alt="Imagem carregada">
      </div>
      <div class='container-upload-image__button'>
        <img data-select="button-icon" src="${plusIcon}" alt="Botão com ícone">
        <div class="container-upload-image__loader hidden" data-select="loader"></div>
      </div>
      <input class="container-upload-image__input" id="input-file" name="input-file" type="file" accept="image/*" data-select="upload-input" aria-label="Carregar imagem">
    </label>
    <div class="container-upload-image__error-message hidden" data-select="error-message"></div>
  </div>
`;

export default function UploadImage() {
  Component.call(this, { html, events });

  const imagePreview = this.selected.get('image-preview');
  const buttonIcon = this.selected.get('button-icon');
  const uploadInput = this.selected.get('upload-input');
  const loader = this.selected.get('loader');
  const errorMessage = this.selected.get('error-message');

  this.reader = new FileReader();
  this.imageFile = null;
  this.imageUrl = null;
  this.isUploading = false;

  this.reset = () => {
    this.imageFile = null;
    this.imageUrl = null;
    imagePreview.src = '';
    imagePreview.classList.add('hidden');
    buttonIcon.src = plusIcon;
    buttonIcon.classList.remove('hidden');
    this.hiderLoader();
    errorMessage.classList.add('hidden');
    uploadInput.value = '';
  };

  this.showLoader = () => {
    loader.classList.remove('hidden');
    buttonIcon.classList.add('hidden');
  };

  this.hideLoader = () => {
    loader.classList.add('hidden');
    buttonIcon.classList.remove('hidden');
  };

  this.showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
      errorMessage.classList.add('hidden');
    }, 5000);
  };

  const readAndDisplayImage = (file) =>
    new Promise((resolve) => {
      this.reader.onload = (e) => {
        const readerTarget = e.target;
        imagePreview.src = readerTarget.result;
        imagePreview.classList.remove('hidden');
        buttonIcon.src = photoIcon;
        this.emit('value:change', {
          localUrl: readerTarget.result,
          storageUrl: null,
        });
        resolve(readerTarget.result);
      };
      this.reader.readAsDataURL(file);
    });

  this.uploadImageToStorage = async () => {
    if (!this.imageFile || this.isUploading) return null;

    try {
      this.isUploading = true;
      buttonIcon.classList.add('hidden');
      this.showLoader();
      this.emit('upload:start');

      const file = this.imageFile;

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('A imagem deve ter menos de 5MB');
      }

      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        throw new Error(
          'Formato de imagem não suportado. Use JPEG, PNG ou GIF',
        );
      }

      const url = await uploadFileToStorage(file);

      if (!url) {
        throw new Error('Falha no upload da imagem');
      }

      this.imageUrl = url;
      this.emit('value:change', {
        localUrl: this.reader.result,
        storageUrl: url,
      });
      this.emit('upload:complete', url);
      return url;
    } catch (error) {
      this.showError(error.message || 'Erro ao enviar imagem');
      this.emit('upload:error', error);
      throw error;
    } finally {
      this.isUploading = false;
      this.hideLoader();
      buttonIcon.classList.remove('hidden');
    }
  };

  const handleInputChange = async (e) => {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (!file) return;

    try {
      this.imageFile = file;
      await readAndDisplayImage(file);
    } catch (error) {
      this.showError('Erro ao carregar imagem');
      this.reset();
    }
  };

  uploadInput.addEventListener('change', handleInputChange);
}

UploadImage.prototype = Object.assign(
  UploadImage.prototype,
  Component.prototype,
  {
    getImageLocal() {
      return this.reader.result || null;
    },

    getImageStorage() {
      return this.imageUrl || null;
    },
    getImageFile() {
      return this.imageFile || null;
    },

    isUploading() {
      return this.isUploading;
    },

    clear() {
      this.reset();
    },
  },
);
