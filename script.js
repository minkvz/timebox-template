// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRflVURdaR04w39clS_gsyR6g5dweCDB0",
  authDomain: "timebox-template.firebaseapp.com",
  projectId: "timebox-template",
  storageBucket: "timebox-template.appspot.com",
  messagingSenderId: "935898728593",
  appId: "1:935898728593:web:5b546dad739f3d56309730",
  measurementId: "G-F0432Y6399"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.addEventListener('DOMContentLoaded', async (event) => {
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const cells = document.querySelectorAll('td[contenteditable="true"]');

    // Function to load data from Firestore
    async function loadData(user) {
        const userId = user.uid;
        const querySnapshot = await db.collection("users").doc(userId).collection("timeboxes").get();
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const cell = document.querySelector(`td[data-time="${data.time}"]`);
            if (cell) {
                cell.textContent = data.content;
            }
        });
    }

    // Function to save data to Firestore
    async function saveData(user, time, content) {
        const userId = user.uid;
        await db.collection("users").doc(userId).collection("timeboxes").doc(time).set({ time, content });
    }

    // Handle login
    loginButton.addEventListener('click', async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    });

    // Handle logout
    logoutButton.addEventListener('click', () => {
        auth.signOut();
    });

    // Listen for authentication state changes
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            loginButton.style.display = 'none';
            logoutButton.style.display = 'block';
            await loadData(user);
            cells.forEach(cell => {
                cell.addEventListener('input', () => {
                    const time = cell.getAttribute('data-time');
                    const content = cell.textContent;
                    saveData(user, time, content);
                });
            });
        } else {
            loginButton.style.display = 'block';
            logoutButton.style.display = 'none';
        }
    });
});
