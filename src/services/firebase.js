import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  initializeFirestore,
} from 'firebase/firestore';
import { Router } from 'vanilla-routing';
import { removePetsLocal, setPetsLocal } from './localStorage';

const firebaseConfig = {
  apiKey: 'AIzaSyDJt47vVZ0Yuq4UWXZuPE5VsecjFQKOP2o',
  authDomain: 'pet-dex-35d7a.firebaseapp.com',
  projectId: 'pet-dex-35d7a',
  storageBucket: 'pet-dex-35d7a.firebasestorage.app',
  messagingSenderId: '927889182739',
  appId: '1:927889182739:web:dc8491ed88b4622ad72fe6',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

export const getPets = async () => {
    try {
      const user = auth.currentUser;
      const userRef = doc(db, 'users', user.uid);
      if (user) {
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const pets = userData.pets || null
            if(pets.length <= 0) {
              setPetsLocal(null)
            } else {
              setPetsLocal(pets);
            }
        } else {
          await removePetsLocal();
        }
      }
    } catch (error) {
      console.error('Erro ao pegar pets:', error);
      throw error;
    }

};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const event = new CustomEvent('auth', { detail: { hasUser: true } });
    window.dispatchEvent(event);
    await getPets();
  } else {
    await removePetsLocal();
    const event = new CustomEvent('auth', { detail: { hasUser: false } });
    window.dispatchEvent(event);
  }
});

const handleHasAuth = (event) => {
  localStorage.setItem('hasUser', JSON.stringify(event.detail.hasUser));
};

window.addEventListener('auth', handleHasAuth);

const createUserDocument = async (user) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      name: user.displayName || 'Usuário',
      email: user.email,
      createdAt: new Date(),
    });
  }
};

export const register = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const { user } = userCredential;
    await updateProfile(user, {
      displayName: name,
    });
    Router.go('/pets');
    window.location.reload();

    await createUserDocument(user);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const { user } = userCredential;
    Router.go('/pets');
    window.location.reload();

    return user;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.message);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const { user } = result;

    await createUserDocument(user);
    Router.go('/pets');
    window.location.reload();

    return user;
  } catch (error) {
    console.error('Erro ao fazer login com Google:', error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    
    await removePetsLocal()
    await signOut(auth);
    await new Promise((resolve) => {
      Router.go('/');
      resolve();
    })
    window.location.reload()
  } catch(error) {
    throw new Error(error);
  }
};

export const uploadFileToStorage = async (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `petImages/${Date.now()}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Erro ao enviar imagem:', error);
    return null;
  }
};

export const addPet = async () => {
  if (!auth.currentUser) return;
  const userId = auth.currentUser.uid;
  const userRef = doc(db, 'users', userId);
  const newPet = JSON.parse(localStorage.getItem('pet'));
  const newPetData = {
    name: {
      image: {
        imageStorage: newPet.name.image.imageStorage,
      },
      name: newPet.name.name,
    },
    petRace: newPet.petRace,
    petBirthday: newPet.petBirthday,
    petWeight: newPet.petWeight,
    petVet: {
      isNeutered: newPet.petVet.isNeutered,
      isSpecialCare: newPet.petVet.isSpecialCare,
      vaccines: newPet.petVet.vaccines,
    },
  };
  try {
    await updateDoc(userRef, {
      pets: arrayUnion({
        id: crypto.randomUUID(),
        ...newPetData,
      }),
    });
    localStorage.removeItem('pet');
  } catch (error) {
    console.error('Erro ao adicionar pet:', error);
  }
};

export const removePet = async (petId) => {
  try {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const updatedPets = userData.pets.filter(pet => pet.id !== petId);
    await updateDoc(userRef, { pets: updatedPets });
  } catch(error) {
    throw new Error(error);
  }
}

export const addVaccine = async (petId, vaccine) => {
  try {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    
    const updatedPets = userData.pets.map(pet => {
        if (pet.id === petId) {
            return {
                ...pet,
                petVet: {
                    ...pet.petVet,
                    vaccines: [...pet.petVet.vaccines, vaccine]
                }
            };
        }
        return pet;
    });

    await updateDoc(userRef, { pets: updatedPets });

  } catch(error) {
    throw new Error (error);
  }
}

export const removeVaccine = async (petId, vaccineId) => {
  try {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    
    const updatedPets = userData.pets.map(pet => {
      if (pet.id === petId) {
        const updatedVaccines = pet.petVet.vaccines.filter(v => v.id !== vaccineId);
        
        return {
          ...pet,
          petVet: {
            ...pet.petVet,
            vaccines: updatedVaccines
          }
        };
      }
      return pet;
    });

    await updateDoc(userRef, { pets: updatedPets });
    return true; 

  } catch(error) {
    throw new Error (error);
  }
}