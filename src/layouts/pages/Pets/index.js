import { Component } from 'pet-dex-utilities';
import './index.scss';
import Card from '~src/components/Card';

const events = ['submit'];

const html = `
  <div class='pets-page'>
    <div class="pets-page__container" data-select="container">
    <div class="loading" data-select="loading" id="loading">Carregando pets...</div>
    </div>
    
  </div>
`;

export default function Pets() {
  Component.call(this, { html, events });
  const $container = this.selected.get("container");
  const $loading = this.selected.get("loading");
  const petsDb = JSON.parse(localStorage.getItem('pets'))
  const user = localStorage.getItem('hasUser')
  
  if(user === "true") {
    petsDb.map((pet) => {
      $loading.style.display = "none"
      this.card = new Card(pet.name.name, pet.petBirthday, pet.name.image)
      this.card.mount($container)
    })
  }

}

Pets.prototype = Object.assign(Pets.prototype, Component.prototype);
