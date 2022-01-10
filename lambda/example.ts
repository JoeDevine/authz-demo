const data = {
  users: [
    {
      id: 1,
      first_name: 'Jasmine',
      last_name: 'Cawdron',
      email: 'jcawdron0@gmail.com',
    },
    {
      id: 2,
      first_name: 'Randolph',
      last_name: 'Phillins',
      email: 'rphillins1@marriott.com',
    },
    {
      id: 3,
      first_name: 'Fran',
      last_name: 'Sheach',
      email: 'fsheach2@hotmail.com',
    },
    {
      id: 4,
      first_name: 'Caron',
      last_name: 'Eversley',
      email: 'ceversley3@slashdot.org',
    },
    {
      id: 5,
      first_name: 'Ethelyn',
      last_name: 'Stear',
      email: 'estear4@stanford.edu',
    },
  ],
  staff: [
    {
      id: 1,
      first_name: 'Edvard',
      last_name: 'Howselee',
      email: 'ehowselee0@company.com',
    },
    {
      id: 2,
      first_name: 'Sandra',
      last_name: 'Grooby',
      email: 'sgrooby1@company.com',
    },
    {
      id: 3,
      first_name: 'Moira',
      last_name: 'Bazley',
      email: 'mbazley2@company.com',
    },
  ],
};

export const handler = async (event: any = {}): Promise<any> => {
  console.log(event.headers.resource);
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: `Hello! You've hit ${event.path}\n`,
  };
};
