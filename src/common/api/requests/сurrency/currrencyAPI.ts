import { get } from 'src/common/api';

const getCurrency = (
  curr: string,
): Promise<{
  rates: { USD: number; AMD: number; RUB: number };
  date: string;
}> => {
  const proxyUrl = 'https://corsproxy.io/?';

  return get(
    proxyUrl +
      encodeURIComponent(`https://api.exchangerate-api.com/v4/latest/${curr}`),
  );
};

export const getAllCurr = async () => {
  const usdFetch = await getCurrency('USD');
  const rubFetch = await getCurrency('RUB');

  const date = usdFetch.date;
  const usdToAmd = usdFetch.rates.AMD;
  const rubToAmd = rubFetch.rates.AMD;

  return { date, usdToAmd, rubToAmd };
};
