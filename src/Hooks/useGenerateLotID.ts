type IGenerateLotID = (
  id: string,
  activeSize: string,
  specialOrder: string[] | []
) => string;

export const useGenerateLotID = () => {
  const lotID: IGenerateLotID = (id, activeSize, specialOrder) => {
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
