import { Component } from 'pet-dex-utilities';
import './index.scss';

import cross from './images/cross.svg';

const events = ['click']

const html = `
<div data-select="avatar-button" class="avatar-button">
  <a class="avatar-button__container" data-select="avatar-button" title="Adicionar amigo">
    <div class="avatar-button__bg">
      <img class="avatar-button__cross" src="${cross}" alt="cross"/>
    </div>
    <div class="avatar-button__text">Adicionar amigo</div>
  </a>
</div>
`;

export default function AvatarButton() {
  Component.call(this, { html, events });
  const $avatarButton = this.selected.get('avatar-button');
  const handleClick = () => {
    this.click();
  };

  this.listen('mount', () => {
    $avatarButton.addEventListener('click', handleClick);
  });

  this.listen('unmount', () => {
    $avatarButton.removeEventListener('click', handleClick);
  });
}

AvatarButton.prototype = Object.assign(
  AvatarButton.prototype,
  Component.prototype, {
    click() {
      this.emit('click');
    }
  }
);
