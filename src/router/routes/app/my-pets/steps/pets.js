import Pets from '~src/layouts/pages/Pets';

export default {
  pathname: '/pets',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const petsPage = new Pets();
    petsPage.mount($content);
    return $content;
  },
};
