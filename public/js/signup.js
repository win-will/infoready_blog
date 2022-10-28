const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  $('#signupMsg').empty();

  if (username && password) {
    // Send the username and password to the server
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const loginResponse = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (loginResponse.ok) {
        document.location.replace('/');
      } else {
        console.log(loginResponse.statusText);
        $('#signupMsg').append("Failed to log in.");
      }
      
    } else {
      console.log(response.statusText);
      $('#signupMsg').append("Failed to sign up user.");
    }
  } else {
    $('#signupMsg').append("Failed to sign up user.");
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
