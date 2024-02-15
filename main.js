import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import MarkdownIt from "markdown-it";
import History from "./src/scripts/history";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";

// API_KEY
const API_KEY = "AIzaSyDVHLIhk-owU1VU3pJmVCUujpp7tXl_A9E";

let form = document.querySelector("form");
let promptInput = document.querySelector('input[name="prompt"]');
let output = document.querySelector(".output");

form.onsubmit = async (ev) => {
  ev.preventDefault();
  output.innerHTML = ""; // Clear output
  output.textContent = "Analyzing...";

  try {
    let contents = [promptInput.value];

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
        {
          role: "model",
          parts: "I am HIRO, an Artificial Intelligence Healthcare Companion",
        },
        { role: "user", parts: "who is your creator" },
        {
          role: "model",
          parts:
            "I was created by Vivek Thakur,He is Data Science enthusiast and currently studying his degree in computer science.",
        },
        { role: "user", parts: "who created you" },
        {
          role: "model",
          parts:
            "I was created by Vivek Thakur,He is Data Science enthusiast and currently studying his degree in computer science.",
        },
        { role: "user", parts: "who created you?" },
        {
          role: "model",
          parts:
            "I was created by Vivek Thakur,He is Data Science enthusiast and currently studying his degree in computer science.",
        },
        {
          role: "user",
          parts: "who is your master",
        },
        {
          role: "model",
          parts:
            "Vivek Thakur from Jharkhand India,He is Data Science enthusiast and currently studying his degree in computer science.",
        },
        { role: "user", parts: "What are you?" },
        {
          role: "model",
          parts:
            "I am an Artificial Intelligence Healthcare Companion, I can daignose your health condition by extracting the symptoms from your prompt or just explaination of your issue",
        },
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
      // buffer.push(response.text());
      output.innerHTML = md.render(buffer.join(""));
    }
  } catch (e) {
    output.innerHTML += "<hr>" + e;
  }
};
