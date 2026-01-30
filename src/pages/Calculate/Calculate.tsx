import React, { useEffect } from 'react';
import styles from './Calculate.module.styl';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { checkIsNumber } from 'src/utils/helpers/checkIsNumber';
import useRequest from 'src/common/hooks/useRequest';
import { getAllCurr } from 'src/common/api/requests/сurrency/currrencyAPI';
import LoaderComponent from 'src/components/LoaderComponent/LoaderComponent';
import { dateTimeForTable } from 'src/common/helpers/dateFunctions';

const Calculate = () => {
  const [usdToAmd, setUsdToAmd] = React.useState<string | null>(null);
  const [rubToAmd, setRubToAmd] = React.useState<string | null>(null);
  const [sum, setSum] = React.useState<string | null>(null);

  const checkIsAll = usdToAmd && rubToAmd && sum;

  const calc =
    checkIsAll && (Number(usdToAmd) / Number(rubToAmd)) * Number(sum);

  const result = checkIsAll && (calc + calc * 0.06).toFixed(2);

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

  const isLoadingPage = !data || isLoading;

  return isLoadingPage ? (
    <LoaderComponent fullHeight={true} />
  ) : (
    <div className={styles.root}>
      <Text size="3xl">
        Конвертация долларов в рубли в центральном банке Армении
      </Text>
      <Text size="2xl">
        USDT/AMD: {data.usdToAmd} RUB/AMD: {data.rubToAmd}
        <br />
        Время проверки {dateTimeForTable(data.rubToAmd)}
      </Text>
      <TextField
        label="Курс USD/AMD"
        value={usdToAmd}
        type="number"
        onChange={({ value }) => checkIsNumber(value) && setUsdToAmd(value)}
      />
      <TextField
        label="Курс USD/RUB"
        value={rubToAmd}
        type="number"
        onChange={({ value }) => checkIsNumber(value) && setRubToAmd(value)}
      />
      <TextField
        label="Сумма выплаты в $, без 6%"
        value={sum}
        type="number"
        onChange={({ value }) => checkIsNumber(value) && setSum(value)}
      />
      {result && (
        <Text size="2xl">Сумма выплаты в рублях + 6% = {result} ₽</Text>
      )}
    </div>
  );
};

export default Calculate;
