export const useDate = () => {
  const getDate = new Date();
  const idWithDate = Date.now();
  const date = `${getDate.getDate()}/${getDate.getMonth()}, ${getDate.getFullYear()}`;

  return {
    idWithDate,
    date,
  };
};
