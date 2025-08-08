---
toc: True
layout: post
data: flask
title: Flask File Structure
description: An overview of the file structure of flask
categories: ['Python Flask']
permalink: /flask-structure-overview
menu: nav/flask.html
author: Anusha Khobare
breadcrumb: True 
---
# Flask Project Structure: Explained

This guide breaks down a typical Flask backend project, especially one used for building real-world APIs and dashboards.

---

## 📁 File & Folder Overview
~~~
/flask-app
│
├── init.py
├── main.py
│
├── /api
│ ├── users.py
│ ├── calendar.py
│ └── issues.py
│
├── /models
│ ├── user.py
│ ├── event.py
│ └── issue.py
│
├── /scripts
│ └── db_init.py
│
├── /templates
│ └── dashboard.html
│
├── /static
│ └── styles.css
│
└── requirements.txt
~~~

---

## 🔧 Top-Level Python Files

### `main.py`
- **Purpose**: Entry point of your app.
- **Runs the server** using Flask.

~~~
from __init__ import create_app
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
~~~
__init__.py
Purpose: App configuration and Blueprint registration.

Sets up Flask and brings together all your routes.
~~~
from flask import Flask
from api.users import user_api
from api.calendar import calendar_api

def create_app():
    app = Flask(__name__)
    app.register_blueprint(user_api)
    app.register_blueprint(calendar_api)
    return app
~~~
🧠 /api/ – Route Handlers (Controllers)
Each file handles specific features of the app (users, events, issues).

Define HTTP endpoints (@app.route(...)) and return JSON responses.

Examples:
- users.py: /register, /login
- calendar.py: /calendar/create
- issues.py: /issues/report

🗄️ /models/ – Database Models
Define database schemas using SQLAlchemy.

Each file represents a table (User, Event, Issue, etc).
~~~
# models/user.py
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
~~~
🛠 /scripts/ – Utility Scripts
One-off tools, like initializing your database.

~~~
# scripts/db_init.py
from __init__ import create_app
from models import db

app = create_app()
with app.app_context():
    db.create_all()
~~~
🖼 /templates/ – HTML Views
Flask uses Jinja2 to render these templates.
Used for simple backend UIs or dashboards.
~~~
<h1>User Dashboard</h1>
<ul>
  {% for user in users %}
    <li>{{ user.username }}</li>
  {% endfor %}
</ul>
~~~
🎨 /static/ – CSS, JS, Images
Assets for the frontend views.

Flask serves these alongside /templates.

📄 requirements.txt – Dependency File
Lists all Python packages your app needs.

Install everything with:
~~~
pip install -r requirements.txt
~~~

✅ Pro Tip: Where to Add New Logic
Want to add a route that uses an external API?
1. Create a new file in /api/ (e.g., weather.py)

2. Add a route using requests.get()

3. Register the Blueprint in __init__.py

Don’t put it in /models/ unless you're saving data to the database!


