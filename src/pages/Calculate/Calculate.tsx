import React, { useEffect } from 'react';
import styles from './Calculate.module.styl';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { checkIsNumber } from 'src/utils/helpers/checkIsNumber';
import useRequest from 'src/common/hooks/useRequest';
import { getAllCurr } from 'src/common/api/requests/сurrency/currrencyAPI';
import LoaderComponent from 'src/components/LoaderComponent/LoaderComponent';
import { dateForTable } from 'src/common/helpers/dateFunctions';

const Calculate = () => {
  const [usdToAmd, setUsdToAmd] = React.useState<string | null>(null);
  const [rubToAmd, setRubToAmd] = React.useState<string | null>(null);
  const [sum, setSum] = React.useState<string | null>(null);

  const checkIsAll = usdToAmd && rubToAmd && sum;

  const result =
    checkIsAll && (Number(usdToAmd) / Number(rubToAmd)) * Number(sum);

  const {
    load: fetchCurr,
    isLoading: isLoading,
    data,
  } = useRequest(getAllCurr, (data) => {
    const { usdToAmd, rubToAmd } = data;
    setUsdToAmd(`${usdToAmd}`);
    setRubToAmd(`${rubToAmd}`);
  });

  useEffect(() => {
    fetchCurr();
  }, []);

  function formatRublesIntl(amount: number) {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  const isLoadingPage = !data || isLoading;

  return isLoadingPage ? (
    <LoaderComponent fullHeight={true} />
  ) : (
    <div className={styles.root}>
      <Text size="3xl">
        Конвертация долларов в рубли в центральном банке Армении
      </Text>
      <Text size="xl">
        USDT/AMD: {data.usdToAmd}
        <br />
        RUB/AMD: {data.rubToAmd}
        <br />
        Время проверки: {dateForTable(data.date)}
      </Text>
      <TextField
        label="Курс USD/AMD"
        value={usdToAmd}
        type="number"
        onChange={({ value }) => checkIsNumber(value) && setUsdToAmd(value)}
      />
      <TextField
        label="Курс RUB/AMD"
        value={rubToAmd}
        type="number"
        onChange={({ value }) => checkIsNumber(value) && setRubToAmd(value)}
      />
      <TextField
        label="Сумма выплаты $"
        value={sum}
        type="number"
        onChange={({ value }) => checkIsNumber(value) && setSum(value)}
      />
      {result && (
        <Text size="2xl">Сумма выплаты = {formatRublesIntl(result)}</Text>
      )}
    </div>
  );
};

export default Calculate;
