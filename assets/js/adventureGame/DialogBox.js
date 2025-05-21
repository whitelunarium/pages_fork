// Utility function for a modern, dark dialog box 
function showDialogBox(title, message, options = []) {
  // Remove any existing dialog
  const oldDialog = document.getElementById('custom-dialog-box');
  if (oldDialog) oldDialog.remove();

  const dialogContainer = document.createElement('div');
  dialogContainer.id = 'custom-dialog-box';
  dialogContainer.style.position = 'fixed';
  dialogContainer.style.top = '50%';
  dialogContainer.style.left = '50%';
  dialogContainer.style.transform = 'translate(-50%, -50%)';
  dialogContainer.style.backgroundColor = '#181a20';
  dialogContainer.style.padding = '28px';
  dialogContainer.style.border = '2px solid #333';
  dialogContainer.style.borderRadius = '14px';
  dialogContainer.style.boxShadow = '0 4px 32px rgba(0,0,0,0.7)';
  dialogContainer.style.zIndex = '1000';
  dialogContainer.style.textAlign = 'center';
  dialogContainer.style.width = '370px';
  dialogContainer.style.fontFamily = 'Inter, Segoe UI, Arial, sans-serif';
  dialogContainer.style.color = '#f3f3f3';

  const titleElement = document.createElement('h2');
  titleElement.innerText = title;
  titleElement.style.marginBottom = '14px';
  titleElement.style.color = '#ffd700';
  titleElement.style.fontFamily = 'Inter, Segoe UI, Arial, sans-serif';
  dialogContainer.appendChild(titleElement);

  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.style.marginBottom = '20px';
  messageElement.style.whiteSpace = 'pre-line';
  messageElement.style.fontSize = '1.08em';
  dialogContainer.appendChild(messageElement);

  options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option.label;
    button.style.margin = '8px';
    button.style.padding = '10px 20px';
    button.style.border = 'none';
    button.style.borderRadius = '6px';
    button.style.backgroundColor = '#444cf7';
    button.style.color = 'white';
    button.style.cursor = 'pointer';
    button.style.fontSize = '15px';
    button.style.fontFamily = 'Inter, Segoe UI, Arial, sans-serif';
    button.onmouseover = () => button.style.backgroundColor = '#222a7a';
    button.onmouseout = () => button.style.backgroundColor = '#444cf7';
    button.onclick = () => {
      option.action();
      if (!option.keepOpen) document.body.removeChild(dialogContainer);
    };
    dialogContainer.appendChild(button);
  });

  document.body.appendChild(dialogContainer);
}

// Janet Yellen Modal/Iframe Utility
export function showYellenModal(url) {
  let modal = document.getElementById('yellenModal');
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "yellenModal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    modal.style.display = "none";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";
    document.body.appendChild(modal);

    // Iframe wrapper
    const iframeWrapper = document.createElement("div");
    iframeWrapper.id = "yellenFrameWrapper";
    iframeWrapper.style.position = "relative";
    iframeWrapper.style.overflow = "hidden";
    iframeWrapper.style.width = "90%";
    iframeWrapper.style.maxWidth = "1000px";
    iframeWrapper.style.height = "80%";
    iframeWrapper.style.border = "2px solid #ccc";
    iframeWrapper.style.borderRadius = "8px";
    iframeWrapper.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
    modal.appendChild(iframeWrapper);

    // Iframe
    const yellenFrame = document.createElement("iframe");
    yellenFrame.id = "yellenFrame";
    yellenFrame.style.width = "100%";
    yellenFrame.style.height = "110%";
    yellenFrame.style.position = "absolute";
    yellenFrame.style.top = "-10%";
    yellenFrame.style.left = "0";
    yellenFrame.style.border = "none";
    iframeWrapper.appendChild(yellenFrame);

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.innerText = "✖";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "10px";
    closeBtn.style.right = "10px";
    closeBtn.style.fontSize = "24px";
    closeBtn.style.background = "#00ff80";
    closeBtn.style.color = "#000";
    closeBtn.style.border = "none";
    closeBtn.style.padding = "10px 15px";
    closeBtn.style.borderRadius = "5px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.boxShadow = "0 0 15px rgba(0,255,128,0.5)";
    closeBtn.style.zIndex = "1100";
    closeBtn.style.transition = "all 0.3s ease";
    closeBtn.onmouseover = () => {
      closeBtn.style.background = "#00cc66";
      closeBtn.style.transform = "scale(1.1)";
    };
    closeBtn.onmouseout = () => {
      closeBtn.style.background = "#00ff80";
      closeBtn.style.transform = "scale(1)";
    };
    closeBtn.onclick = () => {
      modal.style.display = "none";
      yellenFrame.src = "";
    };
    iframeWrapper.appendChild(closeBtn);
  }
  const yellenFrame = document.getElementById('yellenFrame');
  yellenFrame.src = url;
  modal.style.display = "flex";
}

// --- ENHANCED DIALOGUE HELPERS FOR OTHER NPCS ---

// Add a bonus tip for Frank Sinatra
export function getFrankAdviceList() {
  return [
    "The house always has an edge, so play smart and know when to walk away.",
    "Set a budget before you play, and never chase your losses.",
    "Luck be a lady tonight, but skill keeps you in the game.",
    "Sometimes the best bet is the one you don't make.",
    "Enjoy the thrill, but remember: it's just a game.",
    "Frank's Bonus: Sometimes, the best win is knowing when to call it a night!"
  ];
}

// Add a bonus fact for J.P. Morgan
export function getMorganFacts() {
  return [
    "Stocks represent ownership in a company. When you buy a stock, you become a partial owner and can benefit from its success.",
    "Did you know? J.P. Morgan once bailed out the U.S. government during a financial crisis.",
    "Long-term investing often beats short-term speculation.",
    "Bonus: Diversification is a key to reducing risk in your portfolio."
  ];
}

// Add a bonus question for Satoshi Nakamoto
export function getSatoshiQuestions() {
  return [
    "Bitcoin is a decentralized digital currency, born from a desire for freedom and transparency. It operates without banks or governments.",
    "Did you know? The identity of Satoshi Nakamoto is still a mystery.",
    "Would you rather mine Bitcoin or buy it on an exchange?",
    "Bonus: What do you think the future of money looks like?"
  ];
}

export default showDialogBox;