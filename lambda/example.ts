export const handler = async (event: any = {}): Promise<any> => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: `Success! You have access to ${event.header.resource}\n`,
  };
};
