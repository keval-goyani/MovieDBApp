import { act, renderHook } from '@testing-library/react-native';
import useApiDemo from '   ../../../../app/components/hooks/useApiDemo';

describe('useApiDemo hook', () => {
  it('render users list', () => {
    const data = { name: 'henry' };
    const { result } = renderHook(useApiDemo(100));

    act(async () => {
      await result.current.users[data];
    });
    expect(result.current.users).toEqual([data]);
  });

  it('useEffect of renderList ', () => {
    const { result, getByTestId } = renderHook(useApiDemo);
  });
});
