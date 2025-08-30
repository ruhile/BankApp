💳 Banking App (MEAN Stack)

This is a Banking Application built using the MEAN Stack:
- MongoDB – Database for storing user accounts & transactions
- Express.js – Backend REST API
- Angular – Frontend user interface
- Node.js – Runtime environment
 
🚀 Features

- 🔐 User Authentication (Register & Login using JWT)
- 💰 Account Balance tracking (separate for each account number)
- ➕ Credit transactions (deposit money)
- ➖ Debit transactions (withdraw money with balance check)
- 📜 Transaction History (credit, debit, balance after each transaction)
- 📊 Dashboard showing welcome message & current balance

📂 Project Structure
- /Backend   → Express.js + MongoDB API
- /Frontend  → Angular frontend (Material UI for styling)  


⚙️ Setup Instructions

1️⃣ Clone the Repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

2️⃣ Setup Backend
cd Backend
npm install


Create a .env file inside Backend/ with:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Run backend:

npm start


➡️ Backend will start at: http://localhost:5000/

3️⃣ Setup Frontend
cd Frontend
npm install
ng serve


➡️ Frontend will start at: http://localhost:4200/

🧪 API Endpoints
Auth

POST /api/auth/register → Register new user

POST /api/auth/login → Login and get JWT

Transactions

POST /api/transactions/credit → Credit amount

POST /api/transactions/debit → Debit amount

GET /api/transactions/me → Get user’s transaction history

✅ Example Users

Register with name, account number, email, password

Login using account number/email + password

📸 Screenshots

(Add screenshots of login, dashboard, credit/debit, transactions)

🙌 Contributors

👤 Developed by Ruhile Mohammed
