self.addEventListener('push', function(event) {
  // Perform install steps
  console.log("push received", JSON.stringify(event));
});
