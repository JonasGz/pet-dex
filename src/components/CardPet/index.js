import { Component } from 'pet-dex-utilities';
import './index.scss';
import { Router } from 'vanilla-routing';

const events = ['click'];

const html = `
  <div data-select='card-pet' class="card-pet-container">
    <div class="card-pet-container__infos">
      <div class="card-pet-container__name-type">
        <strong class="card-pet-container__name" data-select="card-pet-name">Snow</strong>
        <strong class="card-pet-container__type" data-select="card-pet-type">Cat</strong>
      </div>
      
      <div class="card-pet-container__info" data-select="card-pet-info-age">
        <strong class="card-pet-container__desc" data-select="card-pet-age">Meu doce bichinho que parece um anjo caído do céu e alegra todos os meus dias com sua fofura.</strong>
      </div>
    </div>
    <div class="card-pet-container__img-border1">
      <div class="card-pet-container__img-border2">
        <div class="card-pet-container__img-border3">
          <img data-select="card-pet-img" class="card-pet-container__img" src="https://www.thesprucepets.com/thmb/GOtxsUeyleZs9NHexGNGoPt6OGs=/1080x0/filters:no_upscale():strip_icc()/33351631_260594934684461_1144904437047754752_n-5b17d77604d1cf0037f3ea5a.jpg"/>
        </div>
      </div>
    </div>
  </div>
`;

export default function CardPet(id, name, type, url) {
  Component.call(this, { html, events });
  const $cardPet = this.selected.get('card-pet')
  this.enable = true;
  this.setTitle(name)
  this.setType(type)
  this.setSrc(url)

  $cardPet.addEventListener('click', () => {
    this.goRoute(id);
  })

}

CardPet.prototype = Object.assign(CardPet.prototype, Component.prototype, {
  setTitle(text) {
    this.selected.get('card-pet-name').textContent = text;
  },
  setType(type) {
    this.selected.get('card-pet-type').textContent = type;
  },
  setSrc(url) {
    this.selected.get('card-pet-img').src = url;
  },
  goRoute(id) {
    Router.go(`/pet-profile/${id}`)
  }
  
});
