import { get } from 'src/common/api';

const getCurrency = (
  curr: string,
): Promise<{
  rates: { USD: number; AMD: number; RUB: number };
  time_last_updated: number;
}> => {
  return get(`https://api.exchangerate-api.com/v4/latest/${curr}`);
};

export const getAllCurr = async () => {
  const usdFetch = await getCurrency('USD');
  const rubFetch = await getCurrency('RUB');

  const time = usdFetch.time_last_updated;
  const usdToAmd = usdFetch.rates.AMD;
  const rubToAmd = rubFetch.rates.AMD;

  return { time, usdToAmd, rubToAmd };
};
