export function validateEmail(email) {
  if (email.trim() === '') {
      return { email: 'É necessário inserir um email' };
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return { email: 'Insira um email válido' };
    } 

    return true;
}

export function validatePassword(password) {
  if (password.trim() === '') {
    return { password: 'É necessário inserir uma senha' };
  } else if (password.length < 8) {
    return { password: 'A senha deve conter no mínimo 8 caracteres' };
  } else if (password.length > 20) {
    return { password: 'A senha deve conter no máximo 20 caracteres' };
  } else  if (!/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
    return { password: 'É necessário no mínimo um caractere especial e um número' };
  }

  return true;
}