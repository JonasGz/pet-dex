import { Component } from 'pet-dex-utilities';
import Button from '~src/components/Button';
import RadioButton from '~src/components/RadioButton';
import RangeSlider from '~src/components/RangeSlider';
import TextInput from '~src/components/TextInput';
import './index.scss';
import PetImage from '~src/components/PetImage';
import { Router } from 'vanilla-routing';
import { addData } from '~src/services/localStorage';
import PetProgress from '~src/components/PetProgress';

const events = ['submit'];

const html = `
  <div class="pet-weight-page">
  <div class="pet-weight-page__progress" data-select="pet-progress"></div>

    <div class="pet-weight-page__content" data-select="container">
      <div data-select="image-container"></div>

      <div class="pet-weight-page__description">
        <h1 class="pet-weight-page__title">Qual é o peso do seu animal de estimação?</h1>
        <p class="pet-weight-page__hint">Ajuste de acordo com a realidade</p>
      </div>

      <div class="pet-weight-page__slider-container" data-select="slider-container"></div>

      <div class="pet-weight-page__inputs" data-select="input-container">
      </div>    
    </div>
    <div class="pet-weight-page__footer" data-select="footer"></div>
  </div>;
`;

export default function PetWeight() {
  Component.call(this, { html, events });
  const $petProgress = this.selected.get('pet-progress')

  this.progress = new PetProgress("Peso", "4");
  this.progress.mount($petProgress)

  this.initializeComponents();
  this.setupEventListeners();
  this.applyCssClasses();
  this.petPhoto = 'teste';
  this.weight = 10;
}

PetWeight.prototype = Object.assign(PetWeight.prototype, Component.prototype, {
  initializeComponents() {
    const $footer = this.selected.get('footer');
    const $imageContainer = this.selected.get('image-container');
    const $sliderContainer = this.selected.get('slider-container');
    const $inputsContainer = this.selected.get('input-container');
    const $petImage = JSON.parse(localStorage.getItem('pet'));

    this.setupComponents(
      $footer,
      $imageContainer,
      $sliderContainer,
      $inputsContainer,
      $petImage,
    );
  },

  setupComponents(
    $footer,
    $imageContainer,
    $sliderContainer,
    $inputsContainer,
    $petImage,
  ) {
    this.image = new PetImage($petImage.name.image.imageLocal);
    this.slider = new RangeSlider();
    this.input = new TextInput({
      placeholder: 'Peso',
      assetUrl: '',
      assetPosition: 'prefix',
      variation: 'standard',
    });
    this.radioKG = new RadioButton({
      check: true,
      text: 'KG',
      value: 'kg',
      name: 'weight-unit',
    });
    this.button = new Button({
      text: 'Continuar',
      isFullWidth: false,
      isDisabled: false,
    });

    this.image.mount($imageContainer);
    this.slider.mount($sliderContainer);
    this.input.mount($inputsContainer);
    this.radioKG.mount($inputsContainer);
    this.button.mount($footer);
  },

  applyCssClasses() {
    this.slider.selected
      .get('range-slider')
      .classList.add('pet-weight-page__slider');
    this.slider.selected
      .get('range-slider-value')
      .classList.add('pet-weight-page__value');
    this.input.selected
      .get('input-text')
      .classList.add('pet-weight-page__input');
    this.input.selected
      .get('input-text-container')
      .classList.add('pet-weight-page__input-container');
    this.radioKG.selected
      .get('radio-container')
      .classList.add('pet-weight-page__radio');
    this.button.selected.get('button').classList.add('pet-weight-page__button');
  },

  setupEventListeners() {
    this.slider.listen('value:change', (value) => {
      this.weight = Number(value.toFixed(1));
      this.input.setValue(this.weight);
    });

    this.input.listen('value:change', (value) => {
      const numericValue = parseFloat(value);
      if (!numericValue.isNaN && this.weight !== numericValue) {
        this.weight = numericValue;
        this.slider.setValue(this.weight);
      }
    });

    this.button.listen('click', () => {
      const finalWeightUnit = this.weightUnit();
      const finalWeight = this.weight;
      this.emit('submit', { weight: finalWeight, weightUnit: finalWeightUnit });
      addData(finalWeight)
      Router.go('/pet-vet')
    });
  },

  weightUnit() {
    return this.radioKG.isChecked()
      ? this.radioKG.getValue()
      : this.radioLB.getValue();
  },
});
