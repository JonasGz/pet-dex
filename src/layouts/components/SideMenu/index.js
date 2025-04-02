import { Component } from 'pet-dex-utilities';
import { logout } from '~src/services/firebase';
import AvatarButton from '~src/components/AvatarButton';
import { Router } from 'vanilla-routing';
import PetAvatar from '../../../components/PetAvatar';
import petUrl from '../../../images/pet-dex.svg';
import conta from './images/conta.svg';
import exit from './images/exit.svg';
import exitMenu from './images/exitmenu.svg';
import meusPets from './images/meuspets.svg';
import notificacoes from './images/notifications.svg';
import perfil from './images/perfil.svg';
import register from './images/register.svg';
import addpet from './images/addpet.svg';
import './index.scss';


const html = `
  <nav class="side-menu-nav">
      <figure data-select="logo" class="side-menu-nav__logo-container">
        <img class="side-menu-nav__logo" src="${petUrl}" alt="pet-dex logo" />
      </figure>
      <div class="side-menu-nav__icons">
        <a href="#"><img class="side-menu-nav__notifications" src="${notificacoes}" alt="notificacoes"></a>
        <a href="/account"><img class="side-menu-nav__perfil" src="${perfil}" alt="meu perfil"></a>
        <a data-select="exit" class="side-menu-nav__logout"><img class="side-menu-nav__exit" src="${exit}" alt="sair"></a>
      </div>
      <img data-select="exitMenu" class="side-menu-nav__exitmenu" src="${exitMenu}" alt="Fechar Menu">
    </nav>
    <div class="side-menu-content">
      <div class="side-menu-content__line"></div>
      <div class="side-menu-content__yourpet">
        <h2 class="side-menu-content__title-yourpet">Meus Pets</h2>
        <div class="side-menu-content__avatars-yourpet"  data-select="avatar-container"></div>
      </div>
      <div class="side-menu-content__line"></div>
      <div class="side-menu-content__itens" alt="itens-um">
        <ul class="side-menu-content__ul" data-select="menuitens">
        <li>
            <a data-select="add-pet" data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/pet-name">
              <img src="${addpet}" alt="Add Pet">Add Pet
            </a>
          </li>
          <li>
            <a data-select="my-pets" data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/pets">
              <img src="${meusPets}">Meus Pets
            </a>
          </li>
          <div class="side-menu-content__lineinside"> <div/>
          <li class="side-menu-content__register-li" data-select="register">
            <a data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/account/create-account">
              <img src="${register}" alt="registro">Registro
            </a>
          </li>
          <li data-select="login">
            <a data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/account/login">
              <img src="${conta}" alt="conta">Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`;

export default function SideMenu() {
  Component.call(this, { html });
  const $container = this.selected.get('avatar-container');
  const $register = this.selected.get("register");
  const $login = this.selected.get("login");
  const $addPet = this.selected.get('add-pet');
  const $myPets = this.selected.get('my-pets')
  const $logo = this.selected.get('logo');
  const hasUser = localStorage.getItem("hasUser");
  const petsDb = JSON.parse(localStorage.getItem('pets'));
  
  const addPet = new AvatarButton();
  const $avatarAddPet = addPet.selected.get('avatar-button')
  addPet.mount($container)
  addPet.listen('click', () => {
    Router.go('/pet-name')
  })

  $logo.addEventListener('click', () => this.goRoute())

  if(hasUser === "true") {
    $register.style.pointerEvents = "none"
    $register.style.opacity = "0.6"

    $login.style.pointerEvents = "none"
    $login.style.opacity = "0.6"
    if(petsDb) {
      petsDb.forEach((pet) => {
        const avatar = new PetAvatar({id: pet.id, title: pet.name.name, imgSrc: pet.name.image.imageStorage})
       avatar.mount($container)
      });
    }
    

    const $exit = this.selected.get('exit');
    $exit.addEventListener('click', async () => {
      await logout()
    })

  } else {
    $addPet.style.pointerEvents = "none"
    $addPet.style.opacity = "0.6"

    $myPets.style.pointerEvents = "none"
    $myPets.style.opacity = "0.6"

    $avatarAddPet.style.pointerEvents = 'none'
    $avatarAddPet.style.opacity = "0.6"

    addPet.selected.get('avatar-button').style.pointerEvents = 'none';
    addPet.selected.get('avatar-button').style.opacity = '0.6';
  }



}

SideMenu.prototype = Object.assign(SideMenu.prototype, Component.prototype, {
  goRoute() {
    Router.go('/')
  }
});
