import PetProfile from '~src/layouts/pages/PetProfile';

export default {
  pathname: '/pet-profile',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const petProfilePage = new PetProfile()
    petProfilePage.mount($content);
    return $content;
  },
};
