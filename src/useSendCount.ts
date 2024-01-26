import { useState } from 'react';

type responseJson = {
  count: number;
  ok: boolean;
};

const url = 'https://lk.zont-online.ru/api/button_count';

export function useSendCount() {
  const [count, setCount] = useState<number>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function sendCount(clientCount: number) {
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ count: clientCount }),
        headers: [
          ['Content-Type', 'application/json'],
          ['X-ZONT-Client', 'deni.n1@yandex.ru'],
        ],
      });

      if (!response.ok) {
        const { error_ui } = await response.json();
        throw new Error(error_ui);
      }

      const { count } = (await response.json()) as responseJson;

      setCount(count);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Произошла ошибка');
      }

      setIsLoading(false);
    }
  }

  return [count, errorMessage, isLoading, sendCount] as const;
}
