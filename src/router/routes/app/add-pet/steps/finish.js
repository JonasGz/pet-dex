import PetFinish from '~src/layouts/pages/PetFinish';

export default {
  pathname: '/pet-finish',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const petFinish = new PetFinish();
    petFinish.mount($content);
    return $content;
  },
};
