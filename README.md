# 🛠️ JIRAMA Signalement de Panne

Une application web full-stack pour signaler, suivre et gérer les pannes JIRAMA.  
Développée avec **React** (frontend) et **Django REST Framework** (backend).

---

## 🚀 Fonctionnalités

- 📢 Signalement de panne par les clients
- 📊 Suivi des pannes en temps réel
- 🔧 Interface technicien avec authentification
- 🛠️ Dashboard administrateur (visualisation + suppression)
- 🎨 Interface responsive et intuitive

---

## 🧰 Technologies utilisées

- Frontend : React, Axios, React Router, Bootstrap, SweetAlert2
- Backend : Django, Django REST Framework
- Base de données : SQLite (par défaut)

---

## 🖥️ Installation locale

### 1. Cloner le projet

```bash
git clone https://github.com/<ton-utilisateur>/<ton-depot>.git
cd django-todo-react

2. Backend Django
bash
cd backend
python -m venv env
source env/bin/activate  # ou env\Scripts\activate sur Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

3. Frontend React
cd ../frontend
npm install
npm start

🔐 Accès
Rôle	          Identifiant	Mot de passe
Technicien	      libre	      libre
Administrateur	  admin	     jirama2025

📂 Structure du projet
django-todo-react/
├── backend/
│   └── api/
├── frontend/
│   └── src/
│       ├── components/
│       ├── App.js
│       └── index.js
🤝 Contribuer
Les contributions sont les bienvenues ! Forkez le projet, créez une branche, proposez vos améliorations
