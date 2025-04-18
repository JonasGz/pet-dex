import PetVetPage from '~src/layouts/pages/PetVet';

export default {
  pathname: '/pet-vet',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const petVet = new PetVetPage();
    petVet.mount($content);
    return $content;
  },
};
