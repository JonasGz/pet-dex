import NoPetRegirestedPage from '~src/layouts/pages/NoPetRegirested';

export default {
  pathname: '/donates',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.mount($content);
    return $content;
  },
};
