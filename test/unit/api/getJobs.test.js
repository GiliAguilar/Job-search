import axios from 'axios';
import getJobs from '@/api/getJobs';

vi.mock('axios');

describe('getJobs', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Java Engineer',
        },
      ],
    });
  });

  it('fetches jobs that candidates can apply to', async () => {
    await getJobs();

    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/jobs');
    //esto debería funcionar porque en nuestro .env.test.local definimos nuestra variable VITE_APP_API_URL=http://myfakeapi.com
  });

  it('extracts jobs from response', async () => {
    const jobs = await getJobs();

    expect(jobs).toEqual([{ id: 1, title: 'Java Engineer' }]);
  });
});
