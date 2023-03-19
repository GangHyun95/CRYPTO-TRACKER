import axios from "axios";

const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchCoins = async () => {
  return await axios
    .get(`${BASE_URL}/coins`)
    .then((res) => res.data.slice(0, 100));
};

export const fetchCoinInfo = async (coinId: string) => {
  return await axios //
    .get(`${BASE_URL}/coins/${coinId}`) //
    .then((res) => res.data);
};

export const fetchCoinTickers = async (coinId: string) => {
  return await axios
    .get(`${BASE_URL}/tickers/${coinId}`)
    .then((res) => res.data);
};
