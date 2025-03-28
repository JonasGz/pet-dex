import { extractElements } from 'pet-dex-utilities';
import mainRouter from '../router/main-router';
import { initializeSwiper } from '../utils/swiper';
import Navigation from './components/Navigation';
import SideMenu from './components/SideMenu';
import './index.scss';
import initializeScrollable from './utils/scrollable-sidemenu';

document.addEventListener('DOMContentLoaded', () => {
  const selected = extractElements([document.body]);

  const $home = selected.get('home');

  const $sidemenu = selected.get('sidemenu');
  const sideMenu = new SideMenu();
  sideMenu.mount($sidemenu);

  const $navigation = selected.get('navigation');
  const navigation = new Navigation();
  navigation.mount($navigation);

  const $hamburgerMenu = navigation.selected.get('hamburger-menu');
  const $exitMenu = sideMenu.selected.get('exitMenu');
  const $itemsMenu = sideMenu.selected.get('menuitens').querySelectorAll('li');
  const $petsMenu = sideMenu.selected.get('avatar-container')

  initializeScrollable($hamburgerMenu, $exitMenu, $itemsMenu, $home, $petsMenu);
  initializeSwiper();
  mainRouter();
});
