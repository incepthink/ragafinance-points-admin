import { BackendUrl, clientAxios } from "./constants";

export const fetchDeposits = async (address: string) => {
  const res = await clientAxios.get(`${BackendUrl}/user/data/${address}`);

  return {
    deposits: res.data.userDeposits,
    totalValueDeposited: res.data.totalValueDeposited,
    points: res.data.userPoints,
    totalPointsEarned: res.data.totalPointsEarned,
    userReference: res.data.userReference,
  };
};

export const getZealyData = async (address: string) => {
  const res = await clientAxios.get(`${BackendUrl}/zealy/join/${address}`);

  if (res.status === 200) {
    return {
      error: false,
      user: res.data.user,
    };
  }

  return {
    error: true,
    user: null,
  };
};

export const openNewTab = (url: string) => {
  window.open(url, "_blank");
};
