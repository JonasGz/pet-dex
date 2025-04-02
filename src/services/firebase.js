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
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, 'users', user.uid);
    try {
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const pets = userData.pets || [];
        localStorage.setItem('pets', JSON.stringify(pets));
        return pets;
      } 
        localStorage.removeItem('pets')
      
      return [];
    } catch (error) {
      console.error('Erro ao pegar pets:', error);
      throw error;
    }
  } else {
    return [];
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    const event = new CustomEvent('auth', { detail: { hasUser: true } });
    window.dispatchEvent(event);
    getPets();
  } else {
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
  signOut(auth).then(() => {
    Router.go('/');
    window.location.reload();
  });
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
    console.log("Vacina adicionada com sucesso!");

  } catch(error) {
    throw new Error (error);
  }
}