export function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function delay(duration) {
  if (!duration) {
    duration = random(1000, 5000);
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export async function login(loginId, loginPwd) {
  await delay();
  if (loginId === 'admin' && loginPwd === '123456') {
    const user = {
      name: '管理员',
      loginId
    };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
  return null;
}

export async function loginOut() {
  await delay();
  localStorage.removeItem('user');
}

export async function whoAmI() {
  await delay();
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
}