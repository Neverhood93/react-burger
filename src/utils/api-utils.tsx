async function getResponse<T>(
  res: Response,
  handler: (data: any) => T,
): Promise<T> {
  if (res.ok) {
    const jsonData = await res.json();
    return handler(jsonData);
  }
  throw new Error(`Ошибка ${res.status}`);
}

export default getResponse;
