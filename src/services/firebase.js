import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJt47vVZ0Yuq4UWXZuPE5VsecjFQKOP2o",
  authDomain: "pet-dex-35d7a.firebaseapp.com",
  projectId: "pet-dex-35d7a",
  storageBucket: "pet-dex-35d7a.firebasestorage.app",
  messagingSenderId: "927889182739",
  appId: "1:927889182739:web:dc8491ed88b4622ad72fe6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const {user} = userCredential;
    console.log(user)
    return user
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const {user} = userCredential;
    await updateProfile(user, {
      displayName: name,
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
    throw error;
  }
};