import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, signInAnonymously, type User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "@/config/firebase.project";

function readEnv(value: string | undefined, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

const firebaseConfig = {
  apiKey: readEnv(import.meta.env.VITE_FIREBASE_API_KEY, ""),
  authDomain: readEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, FIREBASE_AUTH_DOMAIN),
  projectId: readEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID, FIREBASE_PROJECT_ID),
  storageBucket: readEnv(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, FIREBASE_STORAGE_BUCKET),
  messagingSenderId: readEnv(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, ""),
  appId: readEnv(import.meta.env.VITE_FIREBASE_APP_ID, ""),
};

let app: FirebaseApp | null = null;

export function isFirebaseConfigured(): boolean {
  return firebaseConfig.apiKey.length > 0 && firebaseConfig.appId.length > 0;
}

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Add VITE_FIREBASE_* values to .env");
  }
  if (!app) app = initializeApp(firebaseConfig);
  return app;
}

export function getDb() {
  return getFirestore(getFirebaseApp());
}

export function getBucket() {
  return getStorage(getFirebaseApp());
}

let anonAuthPromise: Promise<User | null> | null = null;

/** Anonymous auth helps callable Cloud Functions accept storefront requests. */
export function ensureAnonAuth(): Promise<User | null> {
  if (!isFirebaseConfigured()) return Promise.resolve(null);
  if (!anonAuthPromise) {
    anonAuthPromise = signInAnonymously(getAuth(getFirebaseApp()))
      .then((cred) => cred.user)
      .catch((err) => {
        console.warn("Anonymous auth unavailable:", err);
        anonAuthPromise = null;
        return null;
      });
  }
  return anonAuthPromise;
}
