import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { v4 as uuidv4 } from "uuid";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, googleProvider).then((userCred) => {
    window.location.reload();
  });
};

export const signInWithGithub = async () => {
  await signInWithRedirect(auth, githubProvider).then((userCred) => {
    window.location.reload();
  });
};

export const Menus = [
  { id: uuidv4(), name: "Projects", url: "/home/projects" },
  { id: uuidv4(), name: "Collections", url: "/home/collection" },
  { id: uuidv4(), name: "Profile", url: "/home/profile" },
];

export const signOutUser = async () => {
  await auth.signOut().then(() => {
    window.location.reload();
  });
};