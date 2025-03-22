import Login from '~src/layouts/pages/Login';

export default {
  pathname: '/account',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const loginPage = new Login()
    loginPage.mount($content);
    return $content;
  },
};
