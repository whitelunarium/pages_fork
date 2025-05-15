// DialogueSystem.js

class DialogueSystem {
  constructor(dialogues = []) {
    this.dialogues = dialogues.length
      ? dialogues
      : [
          "You've come far, traveler. The skies whisper your name.",
          "The End holds secrets only the brave dare uncover.",
          "Retrieve the elytra and embrace your destiny!"
        ];
    this.dialogueBox = null;
    this.createDialogueBox();
  }

  createDialogueBox() {
    this.dialogueBox = document.createElement("div");
    this.dialogueBox.id = "custom-dialogue-box";
    this.dialogueBox.style.position = "fixed";
    this.dialogueBox.style.bottom = "100px";
    this.dialogueBox.style.left = "50%";
    this.dialogueBox.style.transform = "translateX(-50%)";
    this.dialogueBox.style.padding = "20px";
    this.dialogueBox.style.maxWidth = "80%";
    this.dialogueBox.style.background = "rgba(0, 0, 0, 0.85)";
    this.dialogueBox.style.color = "#00FFFF";
    this.dialogueBox.style.fontFamily = "'Press Start 2P', cursive";
    this.dialogueBox.style.fontSize = "14px";
    this.dialogueBox.style.textAlign = "center";
    this.dialogueBox.style.border = "2px solid #4a86e8";
    this.dialogueBox.style.borderRadius = "12px";
    this.dialogueBox.style.zIndex = "9999";
    this.dialogueBox.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.7)";
    this.dialogueBox.style.display = "none";

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Close";
    closeBtn.style.marginTop = "15px";
    closeBtn.style.padding = "10px 20px";
    closeBtn.style.background = "#4a86e8";
    closeBtn.style.color = "#fff";
    closeBtn.style.border = "none";
    closeBtn.style.borderRadius = "5px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.fontFamily = "'Press Start 2P', cursive";
    closeBtn.onclick = () => {
      this.dialogueBox.style.display = "none";
    };

    this.dialogueText = document.createElement("div");
    this.dialogueBox.appendChild(this.dialogueText);
    this.dialogueBox.appendChild(closeBtn);
    document.body.appendChild(this.dialogueBox);
  }

  showRandomDialogue() {
    const randomDialogue =
      this.dialogues[Math.floor(Math.random() * this.dialogues.length)];
    this.dialogueText.textContent = randomDialogue;
    this.dialogueBox.style.display = "block";
  }
}

export default DialogueSystem;