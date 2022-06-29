import React from 'react';
import { Image, Text, View } from 'react-native';
import { DocumentFooterProps, strings } from '../constants';
import { Icons } from '../theme';
import { styles } from './styles/DocumentFooterStyles';

const DocumentFooter = ({ page, fileType, time }: DocumentFooterProps) => {
  const typeOfPage = fileType === strings.ppt || page;
  const slides = !page ? strings.slides : strings.pages;

  return (
    <View style={styles.documentDetails}>
      {typeOfPage && (
        <>
          <Text style={styles.pageNo}>
            {` ${strings.numberOfPages} ${slides}`}
          </Text>
          <Image source={Icons.fullStop} style={styles.dotIcon} />
        </>
      )}
      <Text style={styles.pageNo}>{strings.sizeOfDocument}</Text>
      <Image source={Icons.fullStop} style={styles.dotIcon} />
      <Text style={styles.pageNo}>{fileType}</Text>
      <Text style={styles.timeStyle}>{time}</Text>
    </View>
  );
};

export default DocumentFooter;
