import PetName from '~src/layouts/pages/PetName';

export default {
  pathname: '/pet-name',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const petName = new PetName();
    petName.mount($content);
    return $content;
  },
};
