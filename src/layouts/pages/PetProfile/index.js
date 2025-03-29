import { Component } from 'pet-dex-utilities';
import './index.scss';
import Vaccine from '~src/components/Vaccine';
import { findPetById } from '~src/services/localStorage';
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
            <img data-select="avatar-img" class="pet-profile-page__img" src="https://firebasestorage.googleapis.com/v0/b/pet-dex-35d7a.firebasestorage.app/o/petImages%2F1743034270172?alt=media&token=6465b77c-af9f-4bbe-94de-962dd6c2b630" alt=""/>
          </div>
          <div class="pet-profile-page__infos">
            <strong data-select="pet-name" class="pet-profile-page__title">Kratos o bom de guerra</strong>
            <span data-select="pet-type" class="pet-profile-page__subtitle">Dog</span>
          </div>
        </div>
        <div class="pet-profile-page__message">
          <strong class="pet-profile-page__message-title">Mensagem do seu bichinho</strong>
          <div class="pet-profile-page__message-desc">
          Meu doce bichinho que parece um anjo caído do céu e alegra todos os meus dias com sua fofura.
          </div>
        </div>
        <div class="pet-profile-page__options">
          <div class="pet-profile-page__peso">
            <div class="pet-profile-page__peso-title">Peso</div>
            <div data-select="pet-weight" class="pet-profile-page__peso-value">22,2 kg</div>
          </div>
          <div class="pet-profile-page__divisor"></div>
          <div class="pet-profile-page__neutered">
            <div class="pet-profile-page__neutered-title">Castrado?</div>
            <div data-select="pet-neutered" class="pet-profile-page__neutered-value">Sim</div>
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
          <strong data-select="pet-birthday" class="pet-profile-page__birthday-value">3 anos</strong>
        </div>
        <div data-select="container-vaccines" class="pet-profile-page__vaccines">
        </div>
      </div>
      <div class="pet-profile-page__footer"></div>
      </div>
    </div>
  </div>
`;

export default function PetProfile() {
  Component.call(this, { html, events });
  const $avatarImg = this.selected.get('avatar-img');
  const $petName = this.selected.get('pet-name');
  const $petType = this.selected.get('pet-type');
  const $petWeight = this.selected.get('pet-weight');
  const $petNeutered = this.selected.get('pet-neutered');
  const $petBirthday = this.selected.get('pet-birthday');
  const $vaccinesContainer = this.selected.get("container-vaccines");
  const {pathname} = window.location;
  const idUrl = pathname.split("/pet-profile/")[1];
  const petSelect = findPetById(idUrl);

  $avatarImg.src = petSelect.name.image.imageStorage;
  $petName.textContent = petSelect.name.name;
  $petType.textContent = petSelect.petRace;
  $petWeight.textContent = `${petSelect.petWeight} kg`
  $petNeutered.textContent = petSelect.petVet.isNeutered ? 'Sim' : 'Não';
  $petBirthday.textContent = `${petSelect.petBirthday} anos`;
  const vaccinesPet = petSelect.petVet.vaccines;

  const $listVaccines = new Vaccine({ vaccines: vaccinesPet });
  
  $listVaccines.mount($vaccinesContainer);

}

PetProfile.prototype = Object.assign(PetProfile.prototype, Component.prototype);
