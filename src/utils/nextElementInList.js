const nextElementInList = (list, value) => {
  const nextIndex = list.indexOf(value) + 1;
  return list[nextIndex] ? list[nextIndex] : list[0];
};

export default nextElementInList;
