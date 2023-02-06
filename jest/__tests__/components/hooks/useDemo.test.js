import { act, renderHook } from '@testing-library/react-native';
import useDemo from '../../../../app/components/hooks/useDemo';

describe('useDemo hook', () => {
  it('increment count ', () => {
    const { result } = renderHook(useDemo);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toEqual(1);
  });

  it('decrement count ', e => {
    const { result } = renderHook(useDemo);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toEqual(-1);
  });
});
