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

export default showDialogBox; 