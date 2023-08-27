const nextElementInList = <T>(list: T[], value: T) => {
  //aquí estamos creando un parámetro genérico, usamos T para decir Type, que puede ser lo que sea, entonces si ingresa un string, va a pasar la función como si todo fuera string, para hacer reutilizable la función, que acepte cualquier tipo
  const nextIndex = list.indexOf(value) + 1;
  return list[nextIndex] ? list[nextIndex] : list[0];
};

export default nextElementInList;
