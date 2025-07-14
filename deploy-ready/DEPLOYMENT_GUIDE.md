# Money Mornings Empire - Complete Deployment Guide

## 🚀 **Deployment Strategy**

**Frontend**: Vercel (React app)  
**Backend**: Railway (FastAPI + Admin Dashboard)  
**Database**: MongoDB Atlas (Free tier)  

## 📋 **Step-by-Step Deployment**

### **Step 1: Deploy Backend to Railway**

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select `/backend` folder

3. **Configure Environment Variables in Railway**
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/money_mornings
   DB_NAME=money_mornings
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   NOTIFICATION_EMAIL=admin@moneymornings.com
   BACKEND_URL=https://your-railway-app.railway.app
   ```

4. **Railway will automatically**:
   - Install dependencies from `requirements.txt`
   - Start your FastAPI server
   - Give you a URL like: `https://your-app.railway.app`

### **Step 2: Setup MongoDB Atlas**

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create free account

2. **Create Database**
   - Create new cluster (free tier)
   - Database name: `money_mornings`
   - Get connection string

3. **Update Railway Environment**
   - Replace `MONGO_URL` with Atlas connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/money_mornings`

### **Step 3: Setup Email Notifications**

#### **Option A: Gmail (Recommended)**
1. **Enable 2-Factor Authentication** on Gmail
2. **Create App Password**:
   - Google Account → Security → App passwords
   - Generate password for "Mail"
3. **Update Railway Environment**:
   ```
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-16-character-app-password
   NOTIFICATION_EMAIL=admin@moneymornings.com
   ```

#### **Option B: SendGrid (Alternative)**
1. Create SendGrid account
2. Get API key
3. Update backend code to use SendGrid API

### **Step 4: Deploy Frontend to Vercel**

1. **Update Frontend Environment**
   - In `/frontend/.env`:
   ```
   REACT_APP_BACKEND_URL=https://your-railway-app.railway.app
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select `/frontend` as root directory
   - Deploy

3. **Configure Vercel**
   ```
   Framework: Create React App
   Root Directory: frontend
   Build Command: yarn build
   Output Directory: build
   ```

### **Step 5: Test Everything**

1. **Test Backend**
   - Visit: `https://your-railway-app.railway.app/admin`
   - Should see admin dashboard

2. **Test Frontend**
   - Visit: `https://your-vercel-app.vercel.app`
   - Submit a form
   - Check admin dashboard for new submission
   - Check email for notification

## 🔗 **Final URLs**

- **Website**: `https://your-app.vercel.app`
- **Admin Dashboard**: `https://your-railway-app.railway.app/admin`
- **API**: `https://your-railway-app.railway.app/api`

## 📧 **Email Setup Examples**

### **Gmail App Password Setup**
```
1. Go to myaccount.google.com
2. Security → 2-Step Verification → App passwords
3. Select app: Mail
4. Copy 16-character password
5. Use this in SMTP_PASSWORD
```

### **Email Template**
When someone submits a form, you'll receive:
```
Subject: New Application Submitted - John Doe

New Money Mornings Empire Application Submitted!

APPLICANT DETAILS:
Name: John Doe
Email: john@example.com
Phone: (555) 123-4567

BUSINESS DETAILS:
Service Interest: Business Establishment
Funding Amount: $100K - $200K

Admin Dashboard: https://your-railway-app.railway.app/admin
```

## ⚙️ **Environment Variables Summary**

### **Railway (Backend)**
```env
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/money_mornings
DB_NAME=money_mornings
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
NOTIFICATION_EMAIL=admin@moneymornings.com
BACKEND_URL=https://your-railway-app.railway.app
```

### **Vercel (Frontend)**
```env
REACT_APP_BACKEND_URL=https://your-railway-app.railway.app
```

## 🧪 **Testing Checklist**

- [ ] Backend deploys successfully to Railway
- [ ] MongoDB Atlas connection works
- [ ] Admin dashboard accessible
- [ ] Frontend deploys to Vercel
- [ ] Form submission works
- [ ] Email notifications received
- [ ] Admin link works from website

## 🛠️ **Troubleshooting**

### **Common Issues**:
1. **CORS errors**: Check backend CORS settings
2. **Email not sending**: Verify Gmail app password
3. **Database connection**: Check MongoDB Atlas IP whitelist
4. **Admin dashboard 404**: Verify Railway deployment

## 🎯 **Next Steps After Deployment**

1. **Custom Domain**: Point your domain to Vercel
2. **SSL Certificate**: Automatic with Vercel/Railway
3. **Monitoring**: Set up uptime monitoring
4. **Analytics**: Add Google Analytics to frontend