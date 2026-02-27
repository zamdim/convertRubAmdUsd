import { getJson } from 'src/common/api';

const matchCurrency = (
  regex: RegExp,
  json: string,
): string | undefined | null => {
  return json.match(regex)?.[1];
};

export const getAllCurr = async () => {
  const proxyUrl = 'https://corsproxy.io/?';

  const json = await getJson(`${proxyUrl}https://www.cba.am/en/`);

  console.log('sdfsdfsdf', json);

  const usdRegex =
    /<td class="news__table-cell font-light fs18">USD<\/td>\s*<td class="news__table-cell font-medium fs24 tr">1<\/td>\s*<td class="news__table-cell news__table-cell--value font-medium fs24 tr">(\d+\.?\d{0,4})<\/td>/;

  const rubRegex =
    /<td class="news__table-cell font-light fs18">RUB<\/td>\s*<td class="news__table-cell font-medium fs24 tr">1<\/td>\s*<td class="news__table-cell news__table-cell--value font-medium fs24 tr">(\d+\.?\d{0,4})<\/td>/;

  const dateRegex = /Updated at:\s*(\d{2}\.\d{2}\.\d{4})/;

  const usdToAmd = matchCurrency(usdRegex, json) ?? null;
  const rubToAmd = matchCurrency(rubRegex, json) ?? null;
  const date = matchCurrency(dateRegex, json) ?? null;

  return { date, usdToAmd, rubToAmd };
};
