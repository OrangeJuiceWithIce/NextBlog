'use client'
import { useActionState, useState } from "react";
import {createUser} from "@/app/action/auth";
import { SubmitButton } from "../button/SubmitButton";

import styles from './RegisterForm.module.css';

const initialState={
    message:"",
};

export function RegisterForm(){
    const [state,formAction]=useActionState(createUser,initialState);
    const [password,setPassword]=useState('');
    const [strength,setStrength]=useState('');

    const analysePasswordStrength=(password:string)=>{
        let score=0;

        if(password.length>=12)score+=1;
        
        const hasLower=password.match(/[a-z]/);
        const hasUpper=password.match(/[A-Z]/);
        const hasDigit=password.match(/\d/);
        const hasSpecial=password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
        if(hasLower)score+=1;
        if(hasUpper)score+=1;
        if(hasDigit)score+=1;
        if(hasSpecial)score+=1;

        if(score>=4)return "strong";
        else if(score>=3)return "medium";
        else return "weak";
    };

    return (
        <form action={formAction} className={styles.form}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Name:</label>
                <input
                type="text"
                name="name"
                required
                className={styles.input}
                autoComplete="name"
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Email:</label>
                <input
                type="email"
                name="email"
                required
                className={styles.input}
                autoComplete="email"
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Password:</label>
                <input
                type="password"
                name="password"
                required
                className={styles.input}
                autoComplete="new-password"
                onChange={(e)=>{
                    setPassword(e.target.value);
                    setStrength(analysePasswordStrength(e.target.value));
                }}
                />
                {/* 可选密码强度指示器 */}
                <div className={styles.passwordStrength}>
                <div className={styles.strengthBar}>
                <div className={`${styles.strengthProgress} ${styles[strength]}`} />
                </div>
                    {strength? strength : null}
                </div>
            </div>

            <SubmitButton>
                Create Account
            </SubmitButton>

            {state.message && (
                <p className={styles.errorMessage}>
                {state.message}
                </p>
            )}
        </form>
    )
}