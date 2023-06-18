export const SECRET_KEY = 'mesto-api-secret-key';

export const defaultUser = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь',
  avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
};

export const urlRegExp : RegExp = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=-]+(#)?$/;
export const emailRegExp : RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
