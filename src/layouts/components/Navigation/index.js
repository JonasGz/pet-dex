import { Component } from 'pet-dex-utilities';
import './index.scss';

import { logout } from '~src/services/firebase';
import { Router } from 'vanilla-routing';
import petUrl from '../../../images/pet-dex.svg';
import avatarUrl from './images/avatar.svg';
import bellUrl from './images/bell.svg';
import exitUrl from './images/exit.svg';
import menuUrl from './images/menu.svg';

const html = `
  <div class="navigation">
    <figure class="navigation__logo-container" data-select="logo">
      <img  class="navigation__logo" src="${petUrl}" alt="pet-dex logo" />
    </figure>
    <div class="navigation__icons">
      <figure data-select="hamburger-menu" class="navigation__icon-container navigation__icon-container--menu">
        <img class="navigation__icon" src="${menuUrl}" alt="menu" />
      </figure>
      <figure class="navigation__icon-container navigation__icon-container--bell">
        <img class="navigation__icon" src="${bellUrl}" alt="notifications" />
      </figure>
      <figure class="navigation__icon-container navigation__icon-container--avatar">
        <img class="navigation__icon" src="${avatarUrl}" alt="user avatar" />
      </figure>
      <figure data-select="exit" class="navigation__icon-container navigation__icon-container--exit">
        <img class="navigation__icon" src="${exitUrl}" alt="exit button" />
      </figure>
    </div>
  </div>
`;

export default function Navigation() {
  Component.call(this, { html });
  const $logo = this.selected.get('logo');
  const hasUser = localStorage.getItem("hasUser");

  if(hasUser === 'true') {
    const $exit = this.selected.get('exit');
    $exit.addEventListener('click', () => logout())
  }

  $logo.addEventListener('click', () => {
    this.goHome()
  })
 
}

Navigation.prototype = Object.assign(Navigation.prototype, Component.prototype, {
  goHome() {
    Router.go('/')
  }
});
