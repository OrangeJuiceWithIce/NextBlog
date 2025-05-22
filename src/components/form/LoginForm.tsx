'use client'
import { useActionState } from "react";
import {checkUser} from "@/app/action/auth";
import { SubmitButton } from "../button/SubmitButton";

import styles from './LoginForm.module.css';

const initialState={
    message:"",
};

export function LoginForm(){
    const [state,formAction]=useActionState(checkUser,initialState);

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email:</label>
        <input 
          type="email" 
          name="email" 
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Password:</label>
        <input
          type="password"
          name="password"
          required
          className={styles.input}
        />
      </div>

      <SubmitButton>login</SubmitButton>

      {state.message && (
        <p className={styles.errorMessage}>{state.message}</p>
      )}
    </form>
  )
}