// Quick Firebase Connection Test
// Run with: npx tsx test-firebase.ts

import { db } from './src/firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

async function testFirebase() {
  console.log('🔥 Testing Firebase connection...\n');
  
  try {
    // Test 1: Write to Firestore
    console.log('1️⃣ Testing write operation...');
    const testDoc = await addDoc(collection(db, 'test'), {
      message: 'Firebase is working!',
      timestamp: new Date().toISOString()
    });
    console.log('✅ Write successful! Doc ID:', testDoc.id);
    
    // Test 2: Read from Firestore
    console.log('\n2️⃣ Testing read operation...');
    const snapshot = await getDocs(collection(db, 'test'));
    console.log('✅ Read successful! Found', snapshot.size, 'documents');
    
    snapshot.forEach(doc => {
      console.log('  -', doc.id, ':', doc.data());
    });
    
    console.log('\n🎉 Firebase is fully operational!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Open browser and test submissions');
    console.log('3. Check Firebase Console for real-time data');
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    console.log('\nTroubleshooting:');
    console.log('1. Check .env.local has correct Firebase credentials');
    console.log('2. Verify Firestore is enabled in Firebase Console');
    console.log('3. Deploy firestore.rules: firebase deploy --only firestore:rules');
  }
}

testFirebase();
