import { render } from '@testing-library/react-native';
import { DocumentFooter } from '../../../app/components';
import React from 'react';
import { strings } from '../../../app/constants';

describe('Document Footer', () => {
  it('should take a snapshot of DocumentFooter', () => {
    const props = {
      page: false,
      fileType: 'pdf',
      time: '11:48 am',
    };
    const { toJSON } = render(<DocumentFooter {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should renders the number of slides with the text slides when fileType is PPT', () => {
    const props = {
      page: false,
      fileType: 'ppt',
      time: '11:48 am',
    };
    const { getByTestId } = render(<DocumentFooter {...props} />);
    const text = getByTestId('Text according to FileType');

    expect(text.props.children).toEqual(
      ` ${strings.numberOfPages} ${strings.slides}`,
    );
  });

  it('should renders the number of pages with the text pages when fileType is PDF or DOC', () => {
    const props = {
      page: true,
      fileType: 'pdf',
      time: '11:48 am',
    };
    const { getByTestId } = render(<DocumentFooter {...props} />);
    const text = getByTestId('Text according to FileType');
    console.log(text.props.children, '<==text.props.children');

    expect(text.props.children).toEqual(
      ` ${strings.numberOfPages} ${strings.pages}`,
    );
  });

  it('should render with correct fileType and correct time', () => {
    const props = {
      page: true,
      fileType: 'pdf',
      time: '11:48 am',
    };
    const { getByTestId } = render(<DocumentFooter {...props} />);
    const fileTypeText = getByTestId('fileType-text');
    const timeText = getByTestId('time-text');
    expect(fileTypeText.props.children).toEqual(props.fileType);
    expect(timeText.props.children).toEqual(props.time);
  });
});
