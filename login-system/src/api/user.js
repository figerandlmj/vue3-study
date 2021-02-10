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
    return
  }
}