importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js');


  var firebaseConfig = {
    apiKey: "AIzaSyAlg5Ktyws4hG_Tt-ajFMLvRSY7S1HSGAs",
    authDomain: "portalmobile-16c7d.firebaseapp.com",
    databaseURL: "https://portalmobile-16c7d.firebaseio.com",
    projectId: "portalmobile-16c7d",
    storageBucket: "",
    messagingSenderId: "617653590147",
    appId: "1:617653590147:web:feb9b8692157877a"
  };
  
   firebase.initializeApp(firebaseConfig);
   const messaging = firebase.messaging();

	messaging.setBackgroundMessageHandler(function(payload) {
	  console.log('[firebase-messaging-sw.js] Received background message ', payload);
	  // Customize notification here
	  const notificationTitle = 'Background Message Title';
	  const notificationOptions = {
		body: 'Background Message body.',
		icon: '/firebase-logo.png'
	  };

	  return self.registration.showNotification(notificationTitle,
		notificationOptions);
  });
