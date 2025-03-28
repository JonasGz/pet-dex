import { Router } from 'vanilla-routing';

export default {
  pathname: '/',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const hasUser = localStorage.getItem("hasUser");
    if(!(hasUser === "true")) {
      Router.go('/account/login')
    } else {
      Router.go('/pets')
    }
    return $content;
  },
};
