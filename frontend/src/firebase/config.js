import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjpdxd8kj8h77TprOhlw-8YAplw4JbSVo",
  authDomain: "instagram-7c64a.firebaseapp.com",
  projectId: "instagram-7c64a",
  storageBucket: "instagram-7c64a.appspot.com",
  messagingSenderId: "909755026788",
  appId: "1:909755026788:web:c55be57d2f7393c2b0fe71",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
