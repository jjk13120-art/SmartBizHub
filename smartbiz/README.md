# SmartBiz Hub 🚀

SmartBiz Hub is a comprehensive web application designed to help small and medium business owners manage their shops, inventory, customer billing, appointments, queues, and feedback in a single, unified dashboard.

---

## 🛠️ Tech Stack
* **Frontend**: React (v19)
* **Backend**: Express.js
* **Database**: MongoDB
* **Styling**: Vanilla CSS with modern premium transitions & animations
* **Integrations**: Nodemailer (Email receipts & confirmations), PDFKit (Invoices), Qrcode (UPI payments)

---

## ⚙️ Local Development Setup

### Prerequisites
1. **Node.js**: Ensure Node.js is installed.
2. **MongoDB**: Install and start MongoDB locally (default: `mongodb://localhost:27017`).

### Steps to Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jjk13120-art/SmartBizHub.git
   cd SmartBizHub/smartbiz
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the `smartbiz` directory and configure your email sender details (see [`.env.example`](.env.example)):
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```
   *(Note: For Gmail, you must generate an **App Password** from your Google account settings).*

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Application**:
   Run the following command to start both the backend server and React frontend concurrently:
   ```bash
   npm start
   ```
   * **Frontend URL**: [http://localhost:3000](http://localhost:3000)
   * **Backend API URL**: [http://localhost:3001](http://localhost:3001)

5. **Stop the Application**:
   Press `Ctrl + C` in the terminal to stop both servers.

---

## 🌐 Deploying the Application Live

Since this is a full-stack application (React frontend + Express backend + MongoDB database), **GitHub Pages alone cannot host the backend or database** because it only supports static websites (HTML/CSS/JS). 

To deploy this application live for free, we recommend hosting the three layers on modern cloud platforms:

### 1. Database (MongoDB Atlas) - FREE
Host your database in the cloud:
1. Sign up on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster.
3. Obtain your connection string (`mongodb+srv://...`).
4. Replace the local MongoDB URI in `server/index.js` with your cloud URI using `process.env.MONGO_URI`.

### 2. Backend (Render / Railway / Koyeb) - FREE
Host your Express.js API:
1. Create a free account on [Render](https://render.com/).
2. Connect your GitHub repository and create a **Web Service**.
3. Set the Root Directory to `smartbiz`.
4. Set the Start Command to `node server/index.js`.
5. Add your Environment Variables (`EMAIL_USER`, `EMAIL_PASS`, and `MONGO_URI`) in the Render dashboard.

### 3. Frontend (GitHub Pages / Vercel / Netlify) - FREE
To host your React frontend on **GitHub Pages**:
1. Install the `gh-pages` package:
   ```bash
   npm install gh-pages --save-dev
   ```
2. Update the frontend fetch/axios calls (currently pointing to `http://localhost:3001`) to point to your live Render backend URL instead of localhost.
3. Add a `"homepage"` field in `package.json` pointing to `https://<your-username>.github.io/<repo-name>`.
4. Add the deployment scripts to your scripts block in `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
5. Run `npm run deploy` to publish the React build to GitHub Pages.
