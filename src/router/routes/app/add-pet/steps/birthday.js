import PetBirthday from '~src/layouts/pages/PetBirthday';

export default {
  pathname: '/pet-birthday',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const petBirthday = new PetBirthday();
    petBirthday.mount($content);
    return $content;
  },
};
