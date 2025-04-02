class HelpButton {
  constructor(imagePath) {
    this.imagePath = imagePath;
    this.panelVisible = false;
    this.init();
  }

  init() {
    // Create the help button image
    this.button = document.createElement('img');
    this.button.src = this.imagePath;
    this.button.alt = '';
    this.button.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      width: 50px;
      height: 50px;
      cursor: pointer;
      z-index: 1000;
    `;
    document.body.appendChild(this.button);

    this.button.addEventListener('click', () => this.togglePanel());

    // Key listener for 'h'
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'h') {
        this.togglePanel();
      }
    });
  }

  togglePanel() {
    if (this.panelVisible) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  openPanel() {
    this.panelVisible = true;

    this.panel = document.createElement('div');
    this.panel.id = 'help-panel';
    this.panel.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #001820;
      color: white;
      border: 2px solid #00ff80;
      border-radius: 10px;
      padding: 20px;
      width: 80%;
      max-width: 500px;
      z-index: 1001;
      font-family: Arial, sans-serif;
    `;
    this.panel.innerHTML = `
      <h2>🆘 Help & Instructions</h2>
      <ul style="line-height: 1.6;">
        <li><b>WASD</b> — Move around</li>
        <li><b>E</b> — Interact with characters</li>
        <li><b>H</b> — Toggle this help panel</li>
        <li><b>Objective:</b> Board the plane to Silicon Valley!</li>
      </ul>
      <button id="close-help" style="margin-top: 15px;">Close</button>
    `;

    document.body.appendChild(this.panel);

    document.getElementById('close-help').addEventListener('click', () => this.closePanel());
  }

  closePanel() {
    this.panelVisible = false;
    if (this.panel) {
      this.panel.remove();
      this.panel = null;
    }
  }
}

export default HelpButton;
