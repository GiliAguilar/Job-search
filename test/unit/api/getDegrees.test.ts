import type { Mock } from 'vitest';

import axios from 'axios';
import getDegrees from '@/api/getDegrees';

vi.mock('axios');

const axiosGetMock = axios.get as Mock;
//con esto, le decimos a TS que estamos utilizando un fake axios

describe('getDegrees', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      // axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          degree: "Master's",
        },
      ],
    });
  });

  it('fetches jobs that candidates can apply to', async () => {
    await getDegrees();

    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/degrees');
    //esto debería funcionar porque en nuestro .env.test.local definimos nuestra variable VITE_APP_API_URL=http://myfakeapi.com
  });

  it('extracts jobs from response', async () => {
    const degrees = await getDegrees();

    expect(degrees).toEqual([{ id: 1, degree: "Master's" }]);
  });
});
