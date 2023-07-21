import { useState, useCallback } from "react";

// создаём хук для запроса на сервер
const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, header = {'Content-Type' : 'application/json'}) => {

    setLoading(true);

    try {
        const response = await fetch(url, {method, body, header});

        if (!response.ok) {
            throw new Error(`Не выполнилась загрузка с: ${url}, статус ошибки: ${response.status}`);
        }

        const data = await response.json();

        setLoading(false);

        return data;
    } catch(e) {                // e - приходит ошибка
        setLoading(false);
        setError(e.message);    // текст ошибки
        throw e;                // выкинуть ошибку
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {loading, error, request, clearError};
}

export default useHttp;