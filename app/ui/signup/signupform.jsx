"use client"
import styles from "./signupform.module.css";
import {addUser} from "@/app/lib/action"
import { useFormState } from "react-dom";


const SignupForm = () => {
    const [state, formAction] = useFormState(addUser, undefined);

  return (
    
      <form action={formAction} className={styles.form}>
        <h1>Signup</h1>
        <input type="text" placeholder="email" name="email" />
        <div className={styles.passwordWrapper}>
            <input 
                    type="password"  
                    placeholder="password" 
                    name="password" 
                />
            <span className={styles.passwordTooltip}>Password must be at least 6 characters</span>
        </div>
        <button>Signup</button>
        {state && state}
      </form>
    
  );
};

export default SignupForm;