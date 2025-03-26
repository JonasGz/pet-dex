import { Component } from 'pet-dex-utilities';
import { logout } from '~src/services/firebase';
import AvatarButton from '~src/components/AvatarButton';
import PetAvatar from '../../../components/PetAvatar';
import petUrl from '../../../images/pet-dex.svg';
import configuracoes from './images/configuracoes.svg';
import conta from './images/conta.svg';
import exit from './images/exit.svg';
import exitMenu from './images/exitmenu.svg';
import meusPets from './images/meuspets.svg';
import notificacoes from './images/notifications.svg';
import perfil from './images/perfil.svg';
import petdex from './images/petdex.svg';
import register from './images/register.svg';
import addpet from './images/addpet.svg';
import './index.scss';


const html = `
  <nav class="side-menu-nav">
      <figure class="side-menu-nav__logo-container">
        <img class="side-menu-nav__logo" src="${petUrl}" alt="pet-dex logo" />
      </figure>
      <div class="side-menu-nav__icons">
        <a href="#"><img class="side-menu-nav__notifications" src="${notificacoes}" alt="notificacoes"></a>
        <a href="/account"><img class="side-menu-nav__perfil" src="${perfil}" alt="meu perfil"></a>
        <button data-select="exit" href="#"><img class="side-menu-nav__exit" src="${exit}" alt="sair"></button>
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
            <a data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/pet-name">
              <img src="${addpet}" alt="Add Pet">Add Pet
            </a>
          </li>
          <li>
            <a data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/pets">
              <img src="${meusPets}">Meus Pets
            </a>
          </li>
          <li>
            <a data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/pet-dex">
              <img src="${petdex}" alt="Pet Dex">Pet Dex
            </a>
          </li>
          <hr class="side-menu-content__lineinside"/>
          <li data-select="register">
            <a data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/account/create-account">
              <img src="${register}" alt="registro">Registro
            </a>
          </li>
          <li data-select="login">
            <a data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/account/login">
              <img src="${conta}" alt="conta">Login
            </a>
          </li>
          <li>
            <a data-vanilla-route-link="spa" class="side-menu-content__menuitens" href="/settings">
              <img src="${configuracoes}" alt="configuracoes">Configurações
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
  const hasUser = localStorage.getItem("hasUser");
  const petsDb = JSON.parse(localStorage.getItem('pets'));
  
  const addPet = new AvatarButton();
  addPet.mount($container)

  if(hasUser === "true") {
    $register.style.display = "none"
    $login.style.display = "none"
    
    petsDb.forEach((pet) => {
      const avatar = new PetAvatar({id: Date.now(), title: pet.name.name, imgSrc: pet.name.image})
     avatar.mount($container)
    });

  } 
  

  // const inputIdUser = 1;
  // Para renderização do componente pets avatar, json-server deve está em execução.
  // UserService.getPets(inputIdUser).then((response) => {
  //   response.forEach((pet) => {
  //     const avatar = new PetAvatar(pet);
  //     avatar.mount($container);
  //   });
  // });
}

SideMenu.prototype = Object.assign(SideMenu.prototype, Component.prototype);
