export const useDate = () => {
  const getDate = new Date();
  const idWithDate = Date.now();

  const date = `${getDate.getDate()}/${
    getDate.getMonth() + 1
  }, ${getDate.getFullYear()}`;

  return {
    idWithDate,
    date,
  };
};
