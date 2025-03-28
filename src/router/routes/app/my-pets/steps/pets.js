import NoPetRegirested from '~src/layouts/pages/NoPetRegirested';
import Pets from '~src/layouts/pages/Pets';

export default {
  pathname: '/pets',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const petsDb = JSON.parse(localStorage.getItem('pets'));
    const isNotEmpty = (arr) => arr.length > 0;
    if (!isNotEmpty(petsDb)) {
      const noPetRegistered = new NoPetRegirested();
      noPetRegistered.mount($content)
    } else {
      const petsPage = new Pets();
      petsPage.mount($content);
    }
    
    return $content;
  },
};
