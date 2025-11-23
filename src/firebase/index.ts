'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { Auth, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    // Important! initializeApp() is called without any arguments because Firebase App Hosting
    // integrates with the initializeApp() function to provide the environment variables needed to
    // populate the FirebaseOptions in production. It is critical that we attempt to call initializeApp()
    // without arguments.
    let firebaseApp;
    try {
      // Attempt to initialize via Firebase App Hosting environment variables
      firebaseApp = initializeApp();
    } catch (e) {
      // Only warn in production because it's normal to use the firebaseConfig to initialize
      // during development
      if (process.env.NODE_ENV === "production") {
        console.warn('Automatic initialization failed. Falling back to firebase config object.', e);
      }
      firebaseApp = initializeApp(firebaseConfig);
    }

    return getSdks(firebaseApp);
  }

  // If already initialized, return the SDKs with the already initialized App
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return {
    firebaseApp,
    auth,
    firestore,
  };
}

// This function will create the admin user if it doesn't exist
export async function ensureAdminUserExists(auth: Auth) {
  const adminEmail = 'admin@gotham.net';
  const adminPassword = 'batman123';

  // We need to sign out any current user to check/create the admin user
  const currentUser = auth.currentUser;
  
  // Temporarily sign in to check if admin exists.
  try {
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      // If sign-in is successful, the admin user already exists.
      // We can sign out immediately.
      await signOut(auth);
  } catch (error: any) {
      // If sign-in fails, it's likely because the user doesn't exist.
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
          try {
              // Create the admin user.
              await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
              // Sign out after creation.
              await signOut(auth);
          } catch (creationError) {
              console.error('Failed to create admin user:', creationError);
          }
      } else {
        // Another error occurred during sign-in
        // console.error('Error checking for admin user:', error);
      }
  } finally {
      // If there was a user logged in before this check, we should not re-authenticate them here
      // as it would be complex to handle their original credentials. The user will be in a logged-out
      // state after this check and will need to log in again. This is a trade-off for this automatic
      // admin creation logic.
      if (currentUser) {
        // The user was signed out, they will need to log back in.
        // We can't securely re-login them.
      }
  }
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';

// Add these functions for creating user documents
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export async function createUserProfileDocument(user: any, additionalData: object) {
  if (!user) return;
  const firestore = getFirestore();
  const userRef = doc(firestore, `users/${user.uid}`);
  
  // The official SDK types indicate get() is not on userRef, let's use a compatible way.
  // This part of the code seems to have an issue with the types.
  // For now, we will just set the document, overwriting if it exists,
  // which is acceptable for this use case.
  
  const { email } = user;
  const createdAt = new Date();
  try {
    await setDoc(userRef, {
      email,
      createdAt,
      ...additionalData,
    }, { merge: true });
  } catch (error) {
    console.error('Error creating user document', error);
  }

  return userRef;
}

// Re-export Auth for convenience
export type { Auth };
