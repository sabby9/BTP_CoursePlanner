import Image from "next/image";
import Link from 'next/link'
import styles from "@/app/ui/app.module.css"; 

export default function Home() {
  return (
    <main className={styles.background}> 
            <div className={styles.IIITDlogo}>
          <span className={styles.IIITD}>IIITD</span>
          <span className={styles.Bot}>bot+</span>
        </div>
        
        <div className={styles.container}>
            <div className={styles.textstyle}> 
                Discover Courses, & Provide Feedback in One Place.
            </div>
            <div className={styles.buttonContainer}>
                <Link href="/login" className={styles.textstyle2}>Login Page</Link>
                <Link href="/signup"  className={styles.textstyle2}>Sign-up Page</Link>
            </div>
        </div>
    </main>
  );
}
