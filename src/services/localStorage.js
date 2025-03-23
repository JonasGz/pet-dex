export const addData = async (data) => {
  try {
  // eslint-disable-next-line prefer-const
    let newPet = JSON.parse(localStorage.getItem('pet')) || {};
    if(!newPet.name) {
      newPet.name = data;
      localStorage.setItem('pet', JSON.stringify(newPet));
      return;
    }
    if(!newPet.petRace) {
      newPet.petRace = data;
      localStorage.setItem('pet', JSON.stringify(newPet));
      return;
    }
  
    if(!newPet.petBirthday) {
      newPet.petBirthday = data;
      localStorage.setItem('pet', JSON.stringify(newPet));
      return;
    }
  
    if(!newPet.petWeight) {
      newPet.petWeight = data;
      localStorage.setItem('pet', JSON.stringify(newPet));
      return;
    }
  
    if(!newPet.petVet) {
      newPet.petVet = data;
      localStorage.setItem('pet', JSON.stringify(newPet));

    }


  } catch(error) {
    console.error (error.message)
  }
  

}