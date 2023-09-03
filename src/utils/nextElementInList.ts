const nextElementInList = <T>(list: T[], value: T) => {
  const nextIndex = list.indexOf(value) + 1;
  return list[nextIndex] ? list[nextIndex] : list[0];
};

export default nextElementInList;
