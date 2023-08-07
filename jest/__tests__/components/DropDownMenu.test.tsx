import { render } from '@testing-library/react-native';
import { DropDownMenu } from '../../../app/components';
import React, { useState } from 'react';
import { strings } from '../../../app/constants';

const mockData = {
  popularMovieFilterData: [
    {
      id: 0,
      name: strings.streaming,
    },
    {
      id: 1,
      name: strings.onTv,
    },
    {
      id: 2,
      name: strings.forRent,
    },
    {
      id: 3,
      name: strings.inTheaters,
    },
  ],
};

const { popularMovieFilterData } = mockData;

describe('DropDownMenu', () => {
  beforeEach(() => {
    useState.mockImplementation(jest.requireActual('react').useState);
  });
  const props = {
    data: popularMovieFilterData,
    title: "What's Popular",
    setMethod: jest.fn(),
  };
  it('should take snapshot of dropdownmenu', () => {
    const { toJSON } = render(<DropDownMenu {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
