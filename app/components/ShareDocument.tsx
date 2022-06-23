import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { DocumentFooter } from '../components';
import { ShareDocumentProps, strings } from '../constants';
import { Icons, Images } from '../theme';
import { styles } from './styles/ShareDocumentStyles';

const ShareDocument = ({ fileType }: ShareDocumentProps) => {
  const [docIcon, setDocIcon] = useState(Icons.documentIcon);

  const fileTypeHandler = useCallback((param: string) => {
    let type = {
      [strings.jpg]: () => {
        setDocIcon(Icons.imageDocument);
      },
      [strings.mp4]: () => {
        setDocIcon(Icons.videoDocument);
      },
      [strings.doc]: () => {
        setDocIcon(Icons.documentIcon);
      },
      [strings.ppt]: () => {
        setDocIcon(Icons.pptDocument);
      },
      [strings.pdf]: () => {
        setDocIcon(Icons.pdfDocument);
      },
    };
    return type[param]();
  }, []);

  useEffect(() => {
    fileTypeHandler(fileType);
  }, [fileTypeHandler, fileType]);

  const page = fileType === strings.pdf || fileType === strings.doc;
  const commonContainer =
    fileType === strings.pdf
      ? [styles.commonContainer, styles.position]
      : styles.commonContainer;

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.thumbnail}>
          {fileType === strings.pdf && (
            <Image source={Images.docFirstPage} style={styles.initialPage} />
          )}
          <View style={commonContainer}>
            <View style={styles.innerContainer}>
              <Image source={docIcon} style={styles.documentIcon} />
              <View style={styles.fileNameContainer}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {strings.fileName}
                </Text>
              </View>
            </View>
            <DocumentFooter page={page ?? false} {...{ fileType }} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ShareDocument;
