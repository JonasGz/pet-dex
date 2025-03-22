import PetRace from '~src/layouts/pages/PetRace';

export default {
  pathname: '/pet-race',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const petRacePage = new PetRace()
    petRacePage.mount($content);
    return $content;
  },
};
