import nextElementInList from '@/utils/nextElementInList';

describe('nextElementInList', () => {
  it('Locates element in list and returns the next element', () => {
    const list = ['A', 'B', 'C', 'D', 'E'];
    const value = 'C';
    const result = nextElementInList(list, value);
    expect(result).toBe('D');
  });
  it('Locates the last element in list and returns the next the first element in it', () => {
    const list = ['A', 'B', 'C', 'D', 'E'];
    const result = nextElementInList(list, list.at(-1));
    expect(result).toBe(list.at(0));
  });
});
