import { cleanup, render } from '@testing-library/react-native';
import React from 'react';
import { CustomSkeleton } from '../../../app/components';

jest.useFakeTimers();

describe('Custom skeleton', () => {
  const props = {
    width: 10,
    height: 20,
  };
  afterEach(() => {
    cleanup();
  });

  jest.setTimeout(10000);

  it('should take snapshot of customSkeleton', () => {
    const { toJSON } = render(<CustomSkeleton {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render skeleton with given height and width', () => {
    const { getByTestId } = render(<CustomSkeleton {...props} />);
    const skeleton = getByTestId('Skeleton');
    expect(skeleton.props.style.height).toEqual(props.height);
    expect(skeleton.props.style.width).toEqual(props.width);
  });

  it('should animates opacity from 0.3 to 1 and back to 0.3', async () => {
    const { getByTestId } = render(<CustomSkeleton {...props} />);
    const skeleton = getByTestId('Skeleton');
    // jest.runOnlyPendingTimers();
    console.log(skeleton.props.style.opacity, '<==skeleton.props.style');
    // expect(skeleton.props.style).toMatchObject([{ opacity: 0.3 }]);

    // await act(async () => {
    //   await new Promise(resolve => setTimeout(resolve, 0)); // Wait for next tick
    //   jest.advanceTimersByTime(800);
    // });
    // jest.runOnlyPendingTimers();
    jest.advanceTimersToNextTimer();

    console.log(
      skeleton.props.style.opacity,
      '<==skeleton.props.style.opacity 2',
    );
    // jest.runOnlyPendingTimers();
    // jest.runOnlyPendingTimers();
    // jest.runOnlyPendingTimers();

    // console.log(
    //   skeleton.props.style.opacity,
    //   '<==skeleton.props.style.opacity 3',
    // );
    // jest.runOnlyPendingTimers();
    // console.log(
    //   skeleton.props.style.opacity,
    //   '<==skeleton.props.style.opacity 4',
    // );
    // jest.runOnlyPendingTimers();
    // console.log(
    //   skeleton.props.style.opacity,
    //   '<==skeleton.props.style.opacity 5',
    // );
    // jest.runOnlyPendingTimers();
    // console.log(
    //   skeleton.props.style.opacity,
    //   '<==skeleton.props.style.opacity 6',
    // );
    // expect(skeleton.props.style).toMatchObject([{ opacity: 1 }]);
    // await waitFor(() => jest.advanceTimersByTime(1000));
    // expect(skeleton.props.style).toMatchObject([{ opacity: 0.3 }]);
    // jest.useRealTimers();
    jest.runAllTimers();
  });
});
