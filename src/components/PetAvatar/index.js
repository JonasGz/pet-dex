import { Component } from 'pet-dex-utilities';
import './index.scss';
import { routeLocation, Router } from 'vanilla-routing';

const events = ['active'];

const html = `
  <a class="pet-avatar" data-select="pet-avatar">
    <img class="pet-avatar__img" data-select="pet-image" src="" alt=""/>
    <p class="pet-avatar__title" data-select="pet-title"></p>
  </a>
`;

export default function PetAvatar({ id, title, imgSrc, imgAlt } = {}) {
  Component.call(this, { html, events });
  this.pathname = routeLocation().pathname;
  if (id) this.setRouter(id);
  if (title) this.setTitle(title);
  if (imgSrc) this.setImgSrc(imgSrc);
  if (imgAlt) this.setImgAlt(imgAlt);


  if (this.pathname === `/pet-profile/${id}`) {
    this.activate();
  }

  
}

PetAvatar.prototype = Object.assign(PetAvatar.prototype, Component.prototype, {
  setTitle(text) {
    this.selected.get('pet-title').textContent = text;
  },
  setImgSrc(src) {
    this.selected.get('pet-image').src = src;
  },
  setImgAlt(alt) {
    this.selected.get('pet-image').alt = alt;
  },
  setRouter(id) {
    this.selected.get('pet-avatar').addEventListener('click', () => {
      this.deactivateAll();
      this.activate()
      Router.go(`/pet-profile/${id}`)
    })
  },
  activate() {
    const image = this.selected.get('pet-image');
    const title = this.selected.get('pet-title');
    image.classList.add('pet-avatar__img--active');
    title.classList.add('pet-avatar__title--active');
    this.emit('active');
  },
  deactivateAll() {
    document.querySelectorAll('.pet-avatar__img--active').forEach(img => {
      img.classList.remove('pet-avatar__img--active');
    });
    document.querySelectorAll('.pet-avatar__title--active').forEach(title => {
      title.classList.remove('pet-avatar__title--active');
    });
  },
});
