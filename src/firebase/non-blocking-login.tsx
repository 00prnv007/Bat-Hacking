'use client';
import {
  Auth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword } from 'firebase/auth';


/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string) {
  // CRITICAL: Call createUserWithEmailAndPassword. Do NOT use 'await'.
  return fbCreateUserWithEmailAndPassword(authInstance, email, password);
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call signInWithEmailAndPassword directly. Do NOT use 'await signInWithEmailAndPassword(...)'.
  signInWithEmailAndPassword(authInstance, email, password);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
