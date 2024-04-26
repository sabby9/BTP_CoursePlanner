import { TbMessageChatbot } from "react-icons/tb";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import  { MdLogout } from "react-icons/md";
import styles from "./sidebar.module.css";
import Image from "next/image";
import MenuLink from "./menuLink/menulink";
import { auth, signOut } from "@/app/auth";

const menuItems = [
  {
    title: "Features",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdOutlineSpaceDashboard />,
      },
      {
        title: "Chatbot",
        path: "/dashboard/chatbot",
        icon: <TbMessageChatbot />,
      },
      {
        title: "Feedback",
        path: "/dashboard/feedback",
        icon: <HiOutlinePencilAlt />,
      },
      
    ],
  },
];

function removeEmail(email) {
  return email.replace(/@iiitd\.ac\.in/g, '');
}

const Sidebar = async () => {
  const session = await auth();
  const user = removeEmail(session["user"]["email"]);
  // console.log(session["user"]["email"].replace(/@iiitd\.ac\.in/g, ''));
    return (
      <div className={styles.container}>
        <div className={styles.IIITDlogo}>
          <span className={styles.IIITD}>IIITD</span>
          <span className={styles.Bot}>bot+</span>
        </div>
        <div className={styles.user}>
          <Image className={styles.userImage} src="/userImg.png" alt="" width="50" height="50" />
          <span className={styles.userName}>{user}</span>
        </div>
        <div className={styles.line}></div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form action={async () => {
        "use server";
        await signOut();
      }}
      >
      <button className={styles.logout} >
          Logout
          <MdLogout />
        </button>
        </form>
    </div>
    )
  }
  
  export default Sidebar
// import React from "react";
// import styles from "./sidebar.module.css";
// import Image from "next/image";
// import Link from "next/link";
// import { CiChat1 } from "react-icons/ci";
// import { MdAccountCircle } from "react-icons/md";

// const menuItems = [
//       {
//         href: "/dashboard/chatbot",
//         title: "Chatbot ",
//         icon: <CiChat1 />,
//       },

//       {
//         href: "/dashboard/submitFeedback",
//         title: "Submit Feedback",
//         icon: <MdAccountCircle />,
//       },

// ];
 
// const SideBar = () => {
//   return (
//     <div className={styles.container}>
//       <ul className={styles.list}>
//         {menuItems.map((it) => (
//             <li className={styles.it} key={it.title}>  
//             <Link href={it.href}> {it.title} </Link>
//             </li>


//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SideBar;
