import PetWeight from '~src/layouts/pages/PetWeight';

export default {
  pathname: '/pet-weight',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const petWeight = new PetWeight();
    petWeight.mount($content);
    return $content;
  },
};
