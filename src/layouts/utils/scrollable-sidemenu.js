export default function initializeScrollable(
  hamburger,
  exitmenu,
  itemsMenu,
  home,
  petsMenu,
) {
  const breakpointDesktop = 1024;

  function openMenu() {
    home.classList.remove('home--exit-menu');
    home.classList.add('home--open-menu');
  }

  function closeMenu() {
    home.classList.remove('home--open-menu');
    home.classList.add('home--exit-menu');
  }

  if (window.innerWidth < breakpointDesktop) {
    hamburger.addEventListener('click', openMenu);
    exitmenu.addEventListener('click', closeMenu);
  }

  petsMenu.addEventListener('click', (event) => {
    const target = event.target.closest('.avatar-button, a');

    if (!target) return;

    closeMenu();
  });

  itemsMenu.forEach((li) => {
    li.addEventListener('click', () => {
      if (window.innerWidth < breakpointDesktop) closeMenu();
    });
  });

  return {
    openMenu,
    closeMenu,
  };
}
