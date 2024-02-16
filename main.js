import {GoogleGenerativeAI, HarmBlockThreshold, HarmCategory,} from "@google/generative-ai";
import MarkdownIt from "markdown-it";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";


const API_KEY = "AIzaSyDVHLIhk-owU1VU3pJmVCUujpp7tXl_A9E";
let form = document.querySelector("form");
let promptInput = document.querySelector('input[name="prompt"]');
let output = document.querySelector(".output");
const introCard = document.querySelector(".intro-card")

form.onsubmit = async (ev) => {
  ev.preventDefault();
  
  output.textContent = "Analyzing...";

  try {

    let contents = [promptInput.value];
    promptInput.value = ''
    introCard.style.display = 'none';

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });
    const chat = model.startChat({
      history: [
        { role: "user", parts: "what is your name" },
        { role: "model", parts: "I am HIRO, an Artificial Intelligence Healthcare Companion",},
        { role: "user", parts: "who is your creator" },
        { role: "model", parts: "I was created by Vivek Thakur,He is Data Science enthusiast and currently studying his degree in computer science.",},
        { role: "user", parts: "who created you" },
        { role: "model", parts: "I was created by Vivek Thakur,He is Data Science enthusiast and currently studying his degree in computer science.",},
        { role: "user", parts: "who created you?" },
        { role: "model", parts: "I was created by Vivek Thakur,He is Data Science enthusiast and currently studying his degree in computer science.",},
        { role: "user", parts: "who is your master",},
        { role: "model", parts:"Vivek Thakur from Jharkhand India,He is Data Science enthusiast and currently studying his degree in computer science.",},
        { role: "user", parts: "What are you?" },
        { role: "model", parts:"I am an Artificial Intelligence Healthcare Companion, I can daignose your health condition by extracting the symptoms from your prompt or just explaination of your issue",},
        { role: "user", parts: "Jai Shree Ram" },
        { role: "model", parts:"Jai Shree Ram",},
        { role: "user", parts: "Har Har Mahadev" },
        { role: "model", parts:"Jai Shiv Swayambhu",},
        { role: "user", parts: "Radhe Radhe" },
        { role: "model", parts:"Radhe Radhe",},
        { role: "user", parts: "Jai Mata di" },
        { role: "model", parts:"Jai Mata Rani ki",},
        { role: "user", parts: "Allah Hu akbar" },
        { role: "model", parts:"Sorry But I cannot prompt any religious slogan",},
      ],
      generationConfig: {
        maxOutputTokens: 250,
      },
    });

    const result = await chat.sendMessageStream(contents);
    let buffer = [];
    let md = new MarkdownIt();
    for await (let response of result.stream) {
      buffer.push(`\n${response.text()}`);
      output.innerHTML = md.render(buffer.join(""));
    }
  } catch (e) {
    console.log(e)
    output.innerHTML += "<hr>" + e;
  }
};
