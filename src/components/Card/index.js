import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = ['purchase'];

const html = `
  <div class="card-container">
    <img class="card-container__image" data-select="card-image" src="" alt="">
    <strong class="card-container__title" data-select="card-title"></strong>
    <strong class="card-container__age" data-select="card-age"></strong>

  </div>
`;

export default function Card(name, age, url) {
  Component.call(this, { html, events });
  this.enable = true;
  this.setTitle(name)
  this.setAge(age)
  this.setSrc(url)
}

Card.prototype = Object.assign(Card.prototype, Component.prototype, {
  setTitle(text) {
    this.selected.get('card-title').textContent = text;
  },
  setAge(text) {
    this.selected.get('card-age').textContent = text;
  },
  setSrc(url) {
    this.selected.get('card-image').src = url;
  }
  
});
