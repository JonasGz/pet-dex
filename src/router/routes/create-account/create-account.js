import Register from '~src/layouts/pages/Register';

export default {
  pathname: '/account/create-account',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const registerPage = new Register();
    registerPage.mount($content);
    return $content;
  },
};
