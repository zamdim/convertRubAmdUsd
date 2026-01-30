import { useEffect, useRef, useState } from 'react';
import { RequestStatusEnum } from 'src/common/utils/enum';
import { ResponseMessageType } from 'src/common/utils/types';
import { showToastError } from 'src/utils/funncTools';

const useRequest = <T extends Array<any>, R>(
  request: (...args: T) => Promise<R>,
  successCallback: (data?: R) => void = () => {},
  errorCallback: (err?: Error) => void = () => {},
  isNotToastError?: boolean,
) => {
  //type
  type IFullfilledLoad = {
    status: RequestStatusEnum.FULFILLED;
    data: R;
  };

  type IRejectedLoad = {
    status: RequestStatusEnum.REJECTED;
    data: Error;
  };
  // hook state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<R | null>(null);
  const [errorMessage, setErrorMessage] = useState<ResponseMessageType>();

  // refs
  const cancelRequest = useRef(false);

  const load = async (...args: T): Promise<IFullfilledLoad | IRejectedLoad> => {
    cancelRequest.current = false;
    setIsLoading(true);
    return await request(...args)
      .then((data) => {
        if (!cancelRequest.current) {
          setData(data);
          setIsSuccess(true);
          successCallback && successCallback(data);
        }
        return { status: RequestStatusEnum.FULFILLED, data } as {
          status: RequestStatusEnum.FULFILLED;
          data: R;
        };
      })
      .catch((err: Error) => {
        if (!cancelRequest.current) {
          if (!isNotToastError) {
            showToastError(`${err.message}`);
          }
          setIsError(true);
          setErrorMessage(err);
          console.error(err);

          errorCallback && errorCallback(err);
        }
        return {
          status: RequestStatusEnum.REJECTED,
          data: err,
        } as IRejectedLoad;
      })
      .finally(() => {
        if (!cancelRequest.current) {
          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    return () => {
      cancelRequest.current = true;
    };
  }, []);

  return {
    load,
    isLoading,
    isSuccess,
    isError,
    data,
    errorMessage,
  };
};

export default useRequest;
