new Promise(function(resolve, reject) {
  const permissionResult = Notification.requestPermission(function(result) {
    resolve(result);
  });
  if (permissionResult) {
    permissionResult.then(resolve, reject);
  }
});

window.addEventListener('load', function() {
  navigator.serviceWorker.register('/service-worker.js')
  .then(function(registration) {
    const subscribeOptions = {
      userVisibleOnly: true
    };
    console.log('here');
    return registration.pushManager.subscribe(subscribeOptions)
  }).then(function(pushSubscription) {
    console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
    return pushSubscription;
  });
});
