import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { DocumentFooter } from '../components';
import { ShareDocumentProps, strings } from '../constants';
import { openDocument } from '../services';
import { Icons, Images } from '../theme';
import { messagePosition } from './styles/PositionStyles';
import { documentMessageStyles } from './styles/ShareDocumentStyles';

const ShareDocument = ({
  fileType,
  isLeft,
  message,
  documentName,
  time,
}: ShareDocumentProps) => {
  const [docIcon, setDocIcon] = useState(Icons.documentIcon);
  const page = fileType === strings.pdf || fileType === strings.doc;
  const styles = documentMessageStyles(isLeft);
  const positionStyles = messagePosition(isLeft);
  const commonContainer =
    fileType === strings.pdf
      ? [styles.commonContainer, styles.position]
      : styles.commonContainer;

  const fileTypeHandler = useCallback((param: string) => {
    if (
      param === strings.jpg ||
      param === strings.jpeg ||
      param === strings.png
    ) {
      param = strings.photo;
    }
    let type = {
      [strings.photo]: () => {
        setDocIcon(Icons.imageDocument);
      },
      [strings.mp4]: () => {
        setDocIcon(Icons.videoDocument);
      },
      [strings.doc]: () => {
        setDocIcon(Icons.documentIcon);
      },
      [strings.docx]: () => {
        setDocIcon(Icons.documentIcon);
      },
      [strings.ppt]: () => {
        setDocIcon(Icons.pptDocument);
      },
      [strings.pptx]: () => {
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

  return (
    <View style={[styles.container, positionStyles.contentPosition]}>
      <TouchableOpacity onPress={() => openDocument(message, documentName)}>
        <View style={styles.thumbnail}>
          {fileType === strings.pdf && (
            <Image source={Images.docFirstPage} style={styles.initialPage} />
          )}
          <View style={commonContainer}>
            <View style={styles.innerContainer}>
              <Image source={docIcon} style={styles.documentIcon} />
              <View style={styles.fileNameContainer}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {documentName}
                </Text>
              </View>
            </View>
            <DocumentFooter page={page ?? false} {...{ fileType, time }} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ShareDocument;
