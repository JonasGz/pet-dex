import { extractElements } from 'pet-dex-utilities';
import { Router } from 'vanilla-routing';
import mainRouter from '../router/main-router';
import { initializeSwiper } from '../utils/swiper';
import Navigation from './components/Navigation';
import SideMenu from './components/SideMenu';
import './index.scss';
import initializeScrollable from './utils/scrollable-sidemenu';

document.addEventListener('DOMContentLoaded', () => {
  const selected = extractElements([document.body]);

  const $home = selected.get('home');

  const $navigation = selected.get('navigation');
  const navigation = new Navigation();
  navigation.mount($navigation);

  const $hamburgerMenu = navigation.selected.get('hamburger-menu');
  const hasUser = localStorage.getItem('hasUser') === 'true';

  if (hasUser) {
    const $sidemenu = selected.get('sidemenu');
    const sideMenu = new SideMenu();
    sideMenu.mount($sidemenu);

    const $exitMenu = sideMenu.selected.get('exitMenu');
    const $itemsMenu = sideMenu.selected
      .get('menuitens')
      .querySelectorAll('li');
    const $petsMenu = sideMenu.selected.get('avatar-container');

    initializeScrollable(
      $hamburgerMenu,
      $exitMenu,
      $itemsMenu,
      $home,
      $petsMenu,
    );
  } else {
    $home.classList.add('home--no-sidemenu');
    $hamburgerMenu.style.display = 'none';
  }

  initializeSwiper();

  const originalGo = Router.go.bind(Router);
  Router.go = (pathname, options) => {
    originalGo(pathname, options);
    window.dispatchEvent(new CustomEvent('routechange'));
  };

  mainRouter();
});
