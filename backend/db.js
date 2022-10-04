// This is where you would want to connect to your database

const users = [
  {
    first_name: 'Demo 1',
    user_id: 'navdemo_test_demo1',
    email: 'demo1@example.com',
    business_name: 'Marvel Entertainment',
    business_state: 'NY',
    business_zip: '10104',
  },
  {
    first_name: 'Demo 2',
    user_id: 'navdemo_test_demo2',
    email: 'demo2@example.com',
    business_name: 'Marvel Entertainment',
    business_state: 'NY',
    business_zip: '10104',
  },
  {
    first_name: 'Demo 3',
    user_id: 'navdemo_test_demo3',
    email: 'demo3@example.com',
    business_name: 'Marvel Entertainment',
    business_state: 'NY',
    business_zip: '10104',
  },
  {
    first_name: 'Demo 4',
    user_id: 'navdemo_test_demo4',
    email: 'demo4@example.com',
    business_name: 'Marvel Entertainment',
    business_state: 'NY',
    business_zip: '10104',
  },
]

const usersPasswords = {
  'demo1@example.com': 'nav-demo-site-password',
  'demo2@example.com': 'nav-demo-site-password',
  'demo3@example.com': 'nav-demo-site-password',
  'demo4@example.com': 'nav-demo-site-password',
}

function getUserWithPasswordByEmail(email) {
  let user = users.find((user) => user.email === email)
  if (user) {
    user = { ...user, password: usersPasswords[user.email] }
  }
  return user
}

function getUserBySessionId(sessionId) {
  return users.find((user) => user.user_id === sessionId)
}

module.exports = {
  getUserWithPasswordByEmail,
  getUserBySessionId,
}
