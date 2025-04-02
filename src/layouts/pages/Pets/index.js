import { Component } from 'pet-dex-utilities';
import './index.scss';
import Card from '~src/components/Card';
import Sliding from '~src/components/Sliding';
import Button from '~src/components/Button';
import CardPet from '~src/components/CardPet';
import { Router } from 'vanilla-routing';

const events = ['submit'];

const html = `
  <div class='pets-page'>
  

    <div class="pets-page__container" data-select="container">
      <div class="pets-page__header-page">
        <div class="pets-page__title">Meu Pets</div>
        <div class="pets-page__subtitle">Veja todos os seus Pets</div>
      </div>
      <div class="pets-page__sliding">
        <div data-select="button-prev" class="pets-page__button-prev"></div><div data-select="slider" class="pets-page__slider"></div><div data-select="button-next" class="pets-page__button-next"></div>
      </div>
      <div class="pets-page__footer">
        <div class="pets-page__footer-desc" data-select="footer-desc">
          Faltando alguem? Crie o perfil do seu pet e deixe o nosso site com o focinho do seu filhote!
        </div>
        <div class="pets-page__button-footer" data-select="button-footer"></div>
      </div>
    <div class="loading" data-select="loading" id="loading">Carregando pets...</div>
    </div>
    
  </div>
`;

export default function Pets() {
  Component.call(this, { html, events });
  const $container = this.selected.get("container");
  const $slider = this.selected.get("slider");
  const $buttonPrev = this.selected.get("button-prev");
  const $buttonNext = this.selected.get("button-next");
  const $buttonFooter = this.selected.get("button-footer");
  const $loading = this.selected.get("loading");
  const petsDb = JSON.parse(localStorage.getItem('pets'))
  const user = localStorage.getItem('hasUser')
  
  if(user === "true") {
    $loading.style.display = "none"

    const prev = new Button({
      text: '<',
      isFullWidth: false,
    });
    
    const next = new Button({
      text: '>',
      isFullWidth: false,
    });

    prev.applyCss('button__slider')
    next.applyCss('button__slider')

    const arrayCard = [];
    if(petsDb) {
      petsDb.forEach((pet) => {
        $loading.style.display = "none";
        this.card = new CardPet(pet.id, pet.name.name, pet.petRace, pet.name.image.imageStorage);
        arrayCard.push(this.card.elements[0]);
      })
    }
   

    const sliding = new Sliding({slides: arrayCard,
      slideSideSpacing: 65,
      shuffleMode: true,});
    window.sliding = sliding;
    sliding.mount($slider);
    prev.mount($buttonPrev);
    next.mount($buttonNext);
    prev.listen('click', () => sliding.previous());
    next.listen('click', () => sliding.next());

    const button = new Button({
      text: 'Cadastrar pet',
      isDisabled: false,
      isFullWidth: true,
    })

    button.setIsFullWidth(true)

    $buttonFooter.addEventListener('click', () => {
      Router.go('/pet-name')
    })

    button.mount($buttonFooter)
  
  }

}

Pets.prototype = Object.assign(Pets.prototype, Component.prototype);
