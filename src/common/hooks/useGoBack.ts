import { useNavigate } from 'react-router-dom';

export default function useGoBack(fallBackUrl: string) {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallBackUrl, { replace: true });
    }
  };

  return goBack;
}
