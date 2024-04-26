import styles from "../ui/dashboard/dashboard.module.css"
import Image from "next/image";

const Dashboard = () => {
    return (
      <div className={styles.container}>
        <Image className={styles.elementImage} src= "/Dashboard.svg" alt="" width="700" height="700"></Image>
      </div>
    )
  }
  
  export default Dashboard