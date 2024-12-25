function doGet(e) {
  if (e.parameter.page === 'signup') {
    var html = HtmlService.createTemplateFromFile('signup');
    return html.evaluate().setTitle('Signup');
  } else {
    var html = HtmlService.createTemplateFromFile('login');
    return html.evaluate().setTitle('Login');
  }
}

function redirectToMain() {
  var html = HtmlService.createTemplateFromFile('main').evaluate().setTitle('Main');
  return html;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Function to process login
function processLogin(username, password) {
  var response = { success: false, message: '' };
  var users = getUsers();

  // Check if user exists and password matches
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      response.success = true;
      return response;
    }
  }

  response.message = 'Invalid username or password';
  return response;
}

// Function to process signup
function processSignup(fullname, email, username, password) {
  var response = { success: false, message: '' };
  var users = getUsers();

  // Check if username already exists
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      response.message = 'Username already exists';
      return response;
    }
  }

  // Create new user
  var newUser = [fullname, email, username, password];

  // Add new user to the Google Sheet
  var sheet = SpreadsheetApp.openById("").getSheetByName("Users");
  sheet.appendRow(newUser);
  response.success = true;
  return response;
}

// Function to handle logout
function logoutUser() {
  // Reset user session or any specific logic for logout
  return true;
}

// Function to get users from the Google Sheet
function getUsers() {
  var sheet = SpreadsheetApp.openById("").getSheetByName("Users");
  var data = sheet.getDataRange().getValues();
  var users = [];

  for (var i = 1; i < data.length; i++) {  // Start from 1 to skip the header row
    var user = {
      fullname: data[i][0],
      email: data[i][1],
      username: data[i][2],
      password: data[i][3]
    };
    users.push(user);
  }

  return users;
}



