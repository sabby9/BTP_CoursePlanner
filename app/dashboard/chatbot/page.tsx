"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "./chatbot.module.css";
import { useRouter } from "next/navigation";
import loadingGIF from "./loading2.gif";
import { addRating } from "@/app/lib/action";
import { FaRegStar } from "react-icons/fa";
const ChatPage = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [queryType, setQueryType] = useState<string>("");
  const [isInputFieldDisabled, setIsInputFieldDisabled] =
    useState<boolean>(false);
  const [messages, setMessages] = useState<any>([
    "You can re-select the type by clicking on the category any-time.",
  ]);
  const [isChatInputFieldDisabled, setIsChatInputFieldDisabled] =
    useState<boolean>(true);
  const [awaitRating, setAwaitRating] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [botResponses, setBotResponses] = useState<
    Array<{
      queryType: string;
      query: string;
      response: string;
      rating: number;
    }>
  >([]);

  const handleRatingClick = async (rating: number) => {
    setSelectedRating(rating);
    const lastResp = botResponses.pop();
    if (lastResp) {
      lastResp.rating = rating;
      botResponses.push(lastResp);
      try {
        addRating(lastResp);
      } catch (error) {
        console.log(error);
        throw new Error();
      }
    }

    setAwaitRating(false);
    setIsChatInputFieldDisabled(false);
    setSelectedRating(0);
  };
  const qTypes = [
    {
      q: "1. Peer Feedback of a course",
      qv: "1",
    },
    {
      q: "2. Course Information",
      qv: "2",
    },
    {
      q: "3.  UG FAQs",
      qv: "3",
    },
  ];

  const handleChoiceClick = (choice: string) => {
    setQueryType(choice);
    setIsChatInputFieldDisabled(false);
    console.log(queryType);
  };

  const handleEnterKey = async (event: any) => {
    if (event.key === "Enter" && inputValue.length > 0) {
      const newMessages = [...messages, inputValue, "..."];
      console.log(newMessages);
      setMessages(newMessages);
      setInputValue("");
      await getResponse(newMessages);
    }
  };

  const handleButtonClick = async (event: any) => {
    console.log(isChatInputFieldDisabled);
    console.log("button clicked");
    if (isChatInputFieldDisabled || inputValue.length == 0) return;
    const newMessages = [...messages, inputValue, "..."];
    console.log(newMessages);
    setMessages(newMessages);
    setInputValue("");
    await getResponse(newMessages);
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const getResponse = async (updatedMessages: any) => {
    setIsInputFieldDisabled(true);
    // const apiUrl = "http://192.168.46.229:5000/getResponse";
    const apiUrl = "https://course-planner-backend-cuqlqc5v7a-em.a.run.app/getResponse"

    const requestData = {
      qtype: queryType,
      prompt: updatedMessages[updatedMessages.length - 2],
    };
    console.log(requestData);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request: requestData }),
      });
      if (!response.ok) {
        throw new Error("Failed to send data");
      }
      const data = await response.json();
      console.log(data);
      updatedMessages.pop();
      const newMessages = [...updatedMessages, data["response"]];
      setMessages(newMessages);
      setInputValue("");
      setIsChatInputFieldDisabled(true);

      const botResponse = {
        queryType: queryType,
        query: requestData.prompt,
        response: data["response"],
        rating: 0, // Rating will be filled in by the user later, if exits then take default 0 as unrated
      };

      setBotResponses([...botResponses, botResponse]);
      setAwaitRating(true);
      console.log(awaitRating);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessageStyle = (index: number) => {
    return index % 2 === 0 ? styles.even : styles.odd;
  };

  return (
    <div className={styles.container}>
      <div className={styles.entrymsg}>
        <Image
          className={styles.botImage}
          src="/chatbot.jpeg"
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.entrymsgbody}>
          <span className={styles.botTitle}>IIITDbot+</span>
          <span className={styles.botMsg}>
            Hi, I am the IIITDbot+. I know everything about IIITD. What type of
            queries do you have today?
          </span>
          {qTypes.map((it) => (
            <button
              key={it.qv}
              type="button"
              className={`${styles.q1} ${
                it.qv === queryType ? styles.accentButton : ""
              }`}
              onClick={() => handleChoiceClick(it.qv)}
            >
              {it.q}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.messagecontainer}>
        {messages.map((message: any, index: any) => (
          <div
            className={`${getMessageStyle(index)}`}
            key={index}
            style={{
              marginBottom: "1px",
              alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
              maxWidth: "70%",
            }}
          >
            {message === "..." ? (
              <Image
                className="w-8 h-8"
                src={loadingGIF}
                alt="loading2"
                width={40}
                height={40}
              />
            ) : (
              <div>
                {index % 2 === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "20px",
                    }}
                  >
                    <Image
                      className={styles.botImage}
                      src="/chatbot.jpeg"
                      alt=""
                      width="50"
                      height="50"
                    />
                    <div className={styles.entrymsgbody}>
                      <span className={styles.botTitle}> IIITDbot+ </span>
                      <div className={styles.botMsg}> {message} </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      padding: "20px",
                    }}
                  >
                    <Image
                      className={styles.userImage}
                      src="/userImg.png"
                      alt=""
                      width="50"
                      height="50"
                    />
                    <div className={styles.usermsgbody}>
                      <span className={styles.userTitle}> User </span>
                      <span className={styles.userMsg}> {message} </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.ratingOuterContainer}>
        {awaitRating === true ? (
          <>
            <div className={styles.rateme}>
              <div className={styles.ratingText}>Rate my response!</div>
              <div className={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    className={`${styles.star} ${
                      rating <= selectedRating ? styles.selected : ""
                    }`}
                    onClick={() => handleRatingClick(rating)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div className={styles.search}>
        <input
          type="text"
          ref={inputRef}
          disabled={isChatInputFieldDisabled}
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleEnterKey}
          placeholder="Ask here.."
          className={styles.input}
        />
        <button className={styles.sendButton} onClick={handleButtonClick}>
          <Image
            className={styles.sendButtonImage}
            src="/sendbutton.png"
            alt=""
            width="40"
            height="40"
          />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
