import { Component } from 'pet-dex-utilities';
import './index.scss';


const html = `
   <div class="container-pet-image">
   <div class="container-pet-image__pet-image">
      <div class="container-pet-image__animation">
        <div class="container-pet-image__circle"></div>
        <div class="container-pet-image__circle-duplicate"></div>
      </div>
      <label>
        <div class="container-pet-image__image-container">
          <img class="container-pet-image__placeholder-image" data-select="pet-image-src"  alt="Placeholder">
        </div>
      </label>
    </div>
    </div>
`;

export default function PetImage(imgSrc = "https://images.dog.ceo/breeds/spaniel-brittany/n02101388_5801.jpg") {
  Component.call(this, { html });

  const $petImage = this.selected.get('pet-image-src')
  $petImage.src= imgSrc

}

PetImage.prototype = Object.assign(PetImage.prototype, Component.prototype, {

});
