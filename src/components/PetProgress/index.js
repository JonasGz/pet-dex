import { Component } from 'pet-dex-utilities';
import arrow from './images/arrow';
import './index.scss';

const events = ['purchase'];

const html = `
  <div class="pet-progress">
    <div class="pet-progress__container">
      <div class="pet-progress__arrow">
      ${arrow}</div>
      <div class="pet-progress__container-title">
        <div class="pet-progress__title">Petperfil</div>
        <div class="pet-progress__subtitle" data-select="step-name">Nome</div>
      </div>
      <div class="pet-progress__container-steps">
        <div class="pet-progress__title-step">Pata</div>
        <div class="pet-progress__step"><b class="pet-progress__step-current" data-select="step-number">1</b>/5</div>
      </div>
    </div>

    <div class="pet-progress__container-bar">
      <div data-select="bar1" class="pet-progress__bar1"></div>
      <div data-select="bar2" class="pet-progress__bar2"></div>
    </div>
  </div>
`;

export default function PetProgress(stepName, stepNumber) {
  Component.call(this, { html, events });
  this.enable = true;
  this.setStepName(stepName)
  this.setStepNumber(stepNumber)
}

PetProgress.prototype = Object.assign(PetProgress.prototype, Component.prototype, {
  setStepName(text) {
    this.selected.get('step-name').textContent = text;
  },
  setStepNumber(type) {
    this.selected.get('step-number').textContent = type;
    const progressPercentage = (type / 5) * 100;

    this.selected.get('bar1').style.width = `${progressPercentage}%`;
    this.selected.get('bar2').style.width = `${100 - progressPercentage}%`;


  },
  
});
