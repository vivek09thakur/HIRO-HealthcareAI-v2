import Logo from "/logo.svg";

document.querySelector("#app").innerHTML = `
<!-- Navbar -->
<div class="sidebar">
  <img src="${Logo}" />
  <div class="text">
    <a
      href="https://hiro-dev-ai.vercel.app"
      style="color: var(--font-color1); opacity: 0.7"
    >
      HIRO | your personal healthcare companion 🚀
    </a>
  </div>
</div>

<main>
  <!-- IntroCard -->
  <div class="intro-card">
    <h1>
      Hello I'am HIRO,<br />
      Your personal healthcare companion
    </h1>
    <br />
    <p>I can do these following things, .i.g :</p>
    <li>
      <b
        >I can predict the disease you might have by examining your symptoms
      </b>
    </li>
    <li><b>I can answer your health queries</b></li>
    <li><b>I can suggest a good diet plan</b></li>
    <li><b>I can tell precautions to a disease</b></li>
    <br />
    <p>
      Just explain your health issues in the prompt box below and Results
      will apear below
    </p>
  </div>

  <!-- Chat-History -->
  <div class="chat-window">
    <p class="output"></p>
  </div>
</main>

<!-- Prompt-Box -->
<form class="text-form">
  <div class="prompt-box">
    <label>
      <input
        name="prompt"
        placeholder="Explain your health issues here"
        type="text"
        value=""
      />
    </label>
    <button type="submit" class="btn btn-primary">GO</button>
  </div>
  <p id="small">
    ⚠️ This bot may produce inaccurate information, please consult a doctor
    before trusting or relaying on hiro response
  </p>
</form>
`;