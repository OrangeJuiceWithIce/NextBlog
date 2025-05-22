"use client";

import { useFormStatus } from "react-dom";

import styles from "./SubmitButton.module.css";
import React from "react";

export function SubmitButton({children}:{children:React.ReactNode}){
    const {pending}=useFormStatus();

    return (
        <button 
            type="submit" 
            disabled={pending}
            className={styles.submitButton}
        >
            {children}
        </button>
    );
}