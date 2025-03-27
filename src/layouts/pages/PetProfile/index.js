import { Component } from 'pet-dex-utilities';
import './index.scss';
import birthday from './images/birthday';

const events = ['submit'];

const html = `
  <div class='pet-profile-page'>
    <div class="pet-profile-page__container" data-select="container">
      <div class="pet-profile-page__header-page">
        <div class="pet-profile-page__header-title">Petperfil</div>
      </div>
      <div class="pet-profile-page__content">
        <div class="pet-profile-page__content-header">
          <div class="pet-profile-page__avatar">
            <img class="pet-profile-page__img" src="https://firebasestorage.googleapis.com/v0/b/pet-dex-35d7a.firebasestorage.app/o/petImages%2F1743034270172?alt=media&token=6465b77c-af9f-4bbe-94de-962dd6c2b630" alt=""/>
          </div>
          <div class="pet-profile-page__infos">
            <strong class="pet-profile-page__title">Kratos o bom de guerra</strong>
            <span class="pet-profile-page__subtitle">Dog</span>
          </div>
        </div>
        <div class="pet-profile-page__message">
          <strong class="pet-profile-page__message-title">Mensagem do seu bichinho</strong>
          <div class="pet-profile-page__message-desc">
          Mistura marrom-escura-branca, com sobrancelhas claras e uma mancha em forma de coração na pata esquerda.
          </div>
        </div>
        <div class="pet-profile-page__options">
          <div class="pet-profile-page__peso">
            <div class="pet-profile-page__peso-title">Peso</div>
            <div class="pet-profile-page__peso-value">22,2 kg</div>
          </div>
          <div class="pet-profile-page__divisor"></div>
          <div class="pet-profile-page__neutered">
            <div class="pet-profile-page__neutered-title">Castrado?</div>
            <div class="pet-profile-page__neutered-value">Sim</div>
          </div>
        </div>
        <div class="pet-profile-page__birthday">
          <div class="pet-profile-page__birthday-left">
            ${birthday}
            <div class="pet-profile-page__birthday-info">
              <strong class="pet-profile-page__birthday-info-title">Aniversário</strong>
              <strong class="pet-profile-page__birthday-info-desc">3 Novembro 2019</strong>
            </div>
          </div>
          <strong class="pet-profile-page__birthday-value">3 anos</strong>
        </div>
        
        
      </div>
      <div class="pet-profile-page__footer"></div>
      </div>
    </div>
  </div>
`;

export default function PetProfile() {
  Component.call(this, { html, events });
  const $container = this.selected.get("container");

}

PetProfile.prototype = Object.assign(PetProfile.prototype, Component.prototype);
