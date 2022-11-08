export const useGenerateLotID = () => {
  const lotID = (id, activeSize, specialOrder) => {
    if (specialOrder.length) {
      const order =
        specialOrder.length > 1
          ? [...specialOrder].sort().join("*")
          : [...specialOrder].join("*");
      return `${id}+${activeSize}+${order}`;
    } else {
      return `${id}+${activeSize}`;
    }
  };

  return {
    lotID,
  };
};
