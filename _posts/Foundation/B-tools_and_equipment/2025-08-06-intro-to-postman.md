---
toc: True
layout: post
data: flask
title: Postman Intro Guide
description: Quick Guide to Write & Test APIs with Postman
categories: ['Python Flask']
permalink: /postman-docs
menu: nav/flask.html
author: Anusha Khobare
breadcrumb: True 
---

---
## Why Use Postman?  
- Test backend **without a frontend**.  
- Quickly debug and explore APIs.  
- Save and organize requests for teamwork.

For more information past this lesson visit [postman docs](https://learning.postman.com/docs/introduction/overview/)


### 1. Write Backend Code in VS Code  
- Define API routes in files like `main.py` or inside an `api/` folder.  
- Use the terminal in VS Code to run your Flask server (`python main.py`).  

<br>

<img src="https://github.com/user-attachments/assets/2c79ce35-7312-4abf-bbea-8456bb1fca23" alt="VS Code and API route" style="width:100%; max-width:900px; margin-bottom: 20px;" />

---

### 2️. Test APIs in Postman  
- **Choose method (GET, POST, etc.) and enter your API URL.**  

<br>

<img src="https://github.com/user-attachments/assets/7bc392e0-70dd-4644-bd01-8d8d9d9f083d" alt="Postman Method and URL" style="width:100%; max-width:900px; margin-bottom: 20px;" />

- **Use *Body → raw → JSON* for sending data.**  

<br>

<img src="https://github.com/user-attachments/assets/cc8a8572-05fb-4e5d-8085-e52d5418358d" alt="Postman JSON body" style="width:100%; max-width:900px; margin-bottom: 20px;" />

- **View status codes and response data in the panel below.**  

<br>

<img src="https://github.com/user-attachments/assets/09ce22c8-fa2e-440b-acb6-b62c632df568" alt="Postman response panel" style="width:100%; max-width:900px; margin-bottom: 20px;" />

---

### 3. VS Code vs Postman: Where To Find the Information

| **Backend (VS Code)**                      | **Testing (Postman)**                           |
|-------------------------------------------|------------------------------------------------|
| localhost url + endpoint                   | type localhost url + endpoint into send bar    |
| <img src="https://github.com/user-attachments/assets/2c79ce35-7312-4abf-bbea-8456bb1fca23" alt="VS Code code" style="width:300px;" /> | <img src="https://github.com/user-attachments/assets/09ce22c8-fa2e-440b-acb6-b62c632df568" alt="Postman send" style="width:300px;" /> |
| Find API call method                       | Select HTTP method and enter URL, click **Send** |
| <img src="https://github.com/user-attachments/assets/81f50f20-d6af-47b6-b556-3831755a22b8" alt="VS Code route" style="width:300px;" /> | <img src="https://github.com/user-attachments/assets/2c79ce35-7312-4abf-bbea-8456bb1fca23" alt="Postman send" style="width:300px;" /> |
| Use `request.json` to read JSON data      | Enter JSON data under **Body → raw → JSON**    |
| <img src="https://github.com/user-attachments/assets/81f50f20-d6af-47b6-b556-3831755a22b8" alt="VS Code JSON" style="width:300px;" /> | <img src="https://github.com/user-attachments/assets/cc8a8572-05fb-4e5d-8085-e52d5418358d" alt="Postman JSON body" style="width:300px;" /> |
| Handle cookies with `request.cookies`    | Manage cookies in Postman’s **Cookies** tab    |
| <img src="https://github.com/user-attachments/assets/8c243b3f-8756-4de5-92a0-9393bd375a6a" alt="VS Code cookies" style="width:300px;" /> | <img src="https://github.com/user-attachments/assets/5b997086-b3ab-450e-84ea-5e2a4979d1e9" alt="Postman cookies" style="width:300px;" /> |

---

### 4️. Common HTTP Methods Overview

| Method  | Purpose        | Usage in VS Code                 | Postman Tip                      |
|---------|----------------|--------------------------------|---------------------------------|
| GET     | Retrieve data  | Route with `methods=['GET']`    | No body needed                  |
| POST    | Create data    | Read JSON from request body     | Use Body tab to send JSON        |
| PUT     | Replace data   | Replace full record             | Send full updated data           |
| PATCH   | Update part    | Partial update logic            | Send partial JSON data           |
| DELETE  | Remove data    | Delete from database            | No body needed                   |

