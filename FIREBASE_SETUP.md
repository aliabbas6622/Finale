# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"**
3. Enter project name: `know-the-word` (or your choice)
4. Disable Google Analytics (optional)
5. Click **"Create project"**

## Step 2: Enable Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose location closest to your users
5. Click **"Enable"**

## Step 3: Get Firebase Credentials

1. In Firebase Console, click the **gear icon** → **Project settings**
2. Scroll to **"Your apps"** section
3. Click the **Web icon** `</>`
4. Register app with nickname: `know-the-word-web`
5. Copy the `firebaseConfig` object

## Step 4: Add Credentials to Project

1. Rename `.env.firebase` to `.env.local`
2. Paste your Firebase config values:
   ```
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

## Step 5: Install Firebase

```bash
npm install firebase
```

## Step 6: Test Connection

Restart your dev server:
```bash
npm run dev
```

## Next Steps

After setup, you'll need to:
- Create Firebase service functions
- Update components to use Firebase
- Set up Firestore security rules
- Migrate existing data

✅ Your Firebase config is ready at `src/firebase/config.js`
