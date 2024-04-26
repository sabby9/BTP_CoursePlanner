"use server";
import { connectToDb } from "./utils";
import { User } from "./models";
import { Rating, Feedback } from "./models";
import { auth, signIn } from "../auth";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

// export const addUser = async (formData) => {
//   const { email, password } =
//     Object.fromEntries(formData);

//   try {
//     connectToDb();

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       email,
//       password: hashedPassword,
//     });
//     console.log({newUser});
//     await newUser.save();
    
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create user!" + err.message);
//   }

//   revalidatePath("/login");
//   redirect("/login");
// };

export const addUser = async (prevState,formData) => {
  const { email, password } =
    Object.fromEntries(formData);

  if (!email.includes("@iiitd.ac.in")) {
    return "Please use a iiitd email address to signup.";
  }
  if (password.length < 6) {
    return "Please use a password of minimum 6 characters.";
  }

  try {
    connectToDb();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });
    console.log({newUser});
    await newUser.save();
    
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!" + err.message);
  }

  // revalidatePath("/login");
  redirect("/login");
};


export const checkUser = async (formData) => {

    const {username, password} = Object.fromEntries(formData);



    try{
        console.log("hello");
        connectToDb();
        const user = new User({email: username, password: password});
        const res = await User.findOne({
            $and: [
              { email: username },
              { password: password },
            ],
          });
        console.log(res);
        if(res != null){
            setisWrong(false);
            return true;
        }
        else{
            setisWrong(true);
            // alert("No matching email and password!");
        }


    }
    catch(err){
        console.log(err)
        throw new Error("failed to create new user!");
    }
}

export const addRating = async (botResponse) => {
    try {
      connectToDb(); 
      console.log("what??");
      console.log(botResponse.queryType);
    
        const newBotResponse = new Rating({
          qtype : botResponse.queryType,
          query : botResponse.query,
          response: botResponse.response,
          rating : botResponse.rating,
        });
        console.log(botResponse.query);
  
        try {
          await newBotResponse.save();
        } catch (error) {
          // Handle the error if the save operation fails for an individual response
          console.error("Error saving bot response:", error.message);
        }
      
    } catch (err) {
      console.log(err);
      throw new Error("Failed to add ratings!");
    }
  };

  export const addFeedback = async (formData) => {
    
    const {
      courseName,
      courseLoad,
      courseDifficulty,
      courseFeedback

    } = Object.fromEntries(formData);
    console.log({formData});
    const session = await auth();
    const email = (session["user"]["email"]);
    console.log({email});

    try {
      connectToDb(); 
      console.log("what??");
      console.log(courseLoad);
    
        const newFeedback = new Feedback({
          email: email,
          courseName: courseName,
          courseLoad: courseLoad,
          courseDifficulty: courseDifficulty,
          courseFeedback: courseFeedback,
        });

        
  
        try {
          await newFeedback.save();
          
        } catch (error) {
          // Handle the error if the save operation fails for an individual response
          console.error("Error saving bot response:", error.message);
          
        }
      
    } catch (err) {
      console.log(err);
      throw new Error("Failed to add feedback!");
    }
    // revalidatePath("/dashboard/feedback");
  };

  export const authenticate = async (prevState, formData) => {
    const { email, password } = Object.fromEntries(formData);
  
    try {
      console.log('We did this! ');
      await signIn("credentials", { email, password });
      
    } catch (err) {
      if (err.message.includes("CredentialsSignin")) {
        return "Wrong Credentials";
      }
      throw err;
    }
  };