import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import apisauce from 'apisauce';
import React, { Dispatch } from 'react';
import { Alert } from 'react-native';
import documentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
import { ImmutableObject } from 'seamless-immutable';
import {
  appConstants,
  ChatDataType,
  ClearChatDataType,
  DetailResponseGenerator,
  DocumentStateDataType,
  genres,
  ListItemDataType,
  MovieDetailsDataType,
  MovieResponseGenerator,
  pickerOptions,
  strings,
} from '../constants';
import { Color, Metrics } from '../theme';

export const apiConfig = apisauce.create({
  baseURL: appConstants.baseUrl,
});

export async function getError(
  response: MovieResponseGenerator | DetailResponseGenerator,
) {
  if (response.problem === strings.clientError) {
    return strings.pageErrorMessage;
  }
  if (response?.problem === strings.networkError) {
    return strings.networkErrorMessage;
  }
  if (
    [strings.connectionError, strings.serverError].includes(response?.problem)
  ) {
    return strings.serverErrorMessage;
  }
  return strings.errorMessage;
}

export const alertMessage = (error: string) => {
  Alert.alert(error);
};

export const getDetails = (
  movieDetails: ImmutableObject<MovieDetailsDataType> | null,
) => {
  const time = movieDetails?.runtime ?? movieDetails?.episode_run_time[0] ?? 0;
  const votePercentage = (movieDetails?.vote_average ?? 0) * 10;
  const activeStrokeColor =
    votePercentage > 69
      ? Color.PercentageDarkGreen
      : Color.percentageDarkYellow;
  const inActiveStrokeColor =
    votePercentage > 69
      ? Color.PercentageLightGreen
      : Color.percentageLightYellow;
  const year = new Date(
    movieDetails?.release_date ?? movieDetails?.first_air_date ?? '',
  )
    .toString()
    .slice(11, 15);
  const country =
    movieDetails?.production_countries.length === 0
      ? ''
      : `(${movieDetails?.production_countries?.[0]?.iso_3166_1})`;
  const movieTitle = movieDetails?.title ?? movieDetails?.name;
  const hour = Math.floor(time / 60);
  const minutes = time % 60;
  const runTime =
    minutes === 0
      ? `${hour}h`
      : hour === 0
      ? `${minutes}m`
      : `${hour}h ${minutes}m`;
  const movieType = movieDetails?.genres?.map(item => item.name).join(', ');
  const directorName = movieDetails?.credits?.crew
    .filter(item => item.job === strings.director)
    .map(item => item.name)
    .join(', ');

  return {
    votePercentage,
    activeStrokeColor,
    inActiveStrokeColor,
    year,
    country,
    movieTitle,
    runTime,
    movieType,
    directorName,
  };
};

const getGenreID = (query: string) => {
  return genres.filter(
    genre => genre?.name.toLowerCase() === query.toLowerCase(),
  )[0]?.id;
};

const searchConditionCheck = (item: string, query: string) => {
  return item?.toLowerCase().includes(query.toLowerCase());
};

export const searchMovie = (movieList: ListItemDataType[], query: string) => {
  const genreId = getGenreID(query);

  return movieList.filter(
    movie =>
      searchDatacheck(movie, query) || movie.genre_ids?.includes(genreId),
  );
};

const searchDatacheck = (
  {
    title,
    original_title,
    original_name,
    name = '',
    overview,
  }: ListItemDataType,
  query: string,
) => {
  return (
    searchConditionCheck(title, query) ||
    searchConditionCheck(original_title, query) ||
    searchConditionCheck(original_name, query) ||
    searchConditionCheck(name, query) ||
    searchConditionCheck(overview, query)
  );
};

export const getUniqueMovies = (movies: ListItemDataType[]) => {
  const uniqueMovies = [
    ...new Map(movies.map(item => [item.id, item])).values(),
  ];

  return uniqueMovies;
};

const padTo2Digits = (input: number) => {
  return input.toString().padStart(2, '0');
};

export const timestampToTime = (timestamp: number) => {
  const hours = new Date(timestamp).getHours();
  const minutes = new Date(timestamp).getMinutes();

  return hours >= 12
    ? `${padTo2Digits(hours - 12)}:${padTo2Digits(minutes)} pm`
    : `${padTo2Digits(hours)}:${padTo2Digits(minutes)} am`;
};

export const getChatTime = (time: number) => {
  const latestChatTime = new Date(time).getDate();
  const currentTime = new Date().getDate();
  const timeDifference = currentTime - latestChatTime;

  if (time !== 0) {
    switch (timeDifference) {
      case 0:
        return timestampToTime(time);
      case 1:
        return strings.yesterday;
      default:
        return new Date(time).toLocaleDateString('en-GB').toString();
    }
  }
  return strings.emptyString;
};

export const sortString = (input: string) => {
  return input.split('').sort().join('');
};

export const chatIdCreation = (userId: string, id: string) => {
  return userId.localeCompare(id) > 0 ? userId + id : id + userId;
};

export const handleCameraPermission = (
  setImagePath: Dispatch<React.SetStateAction<string>>,
) => {
  check(appConstants.cameraPermission)
    .then(result => {
      switch (result) {
        case RESULTS.BLOCKED:
          permissionAlert(strings.cameraPermission);
          break;
        case RESULTS.DENIED:
          requestCameraPermission();
          break;
        case RESULTS.UNAVAILABLE || RESULTS.LIMITED:
          alertMessage(strings.permissionUnavailable);
          break;
        default:
          openCamera(setImagePath);
      }
    })
    .catch(error => {
      alertMessage(error.message);
    });
};

export const handleGalleryPermission = (
  setImagePath: Dispatch<React.SetStateAction<string>>,
) => {
  check(appConstants.galleryPermission)
    .then(result => {
      switch (result) {
        case RESULTS.BLOCKED:
          permissionAlert(strings.galleryPermission);
          break;
        case RESULTS.DENIED:
          requestGalleryPermission();
          break;
        case RESULTS.UNAVAILABLE || RESULTS.LIMITED:
          alertMessage(strings.permissionUnavailable);
          break;
        default:
          selectImage(setImagePath);
      }
    })
    .catch(error => {
      alertMessage(error.message);
    });
};

export const handleDocumentPermission = (
  setDocumentData: Dispatch<React.SetStateAction<DocumentStateDataType>>,
) => {
  if (Metrics.isAndroid) {
    check(appConstants.documentWritePermission).then(result => {
      switch (result) {
        case RESULTS.BLOCKED:
          permissionAlert(strings.document);
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
          break;
        case RESULTS.UNAVAILABLE || RESULTS.LIMITED:
          alertMessage(strings.permissionUnavailable);
          break;
        default:
          selectDocument(setDocumentData);
      }
    });
  } else {
    selectDocument(setDocumentData);
  }
};

const selectDocument = async (
  setDocumentData: Dispatch<React.SetStateAction<DocumentStateDataType>>,
) => {
  await documentPicker
    .pickSingle({
      type: [
        documentPicker.types.pdf,
        documentPicker.types.images,
        documentPicker.types.pptx,
        documentPicker.types.ppt,
        documentPicker.types.doc,
        documentPicker.types.docx,
        documentPicker.types.csv,
        documentPicker.types.zip,
      ],
      presentationStyle: 'fullScreen',
      copyTo: 'documentDirectory',
    })
    .then(response => {
      addDocumentToStorage(
        response?.fileCopyUri ?? '',
        response.name,
        setDocumentData,
      );
    })
    .catch(error => error);
};

const addDocumentToStorage = async (
  url: string,
  documentName: string,
  setDocumentData: Dispatch<React.SetStateAction<DocumentStateDataType>>,
) => {
  const documentTitle = `${appConstants.timestamp}_${documentName}`;
  const documentPath = `${appConstants.storageDocumentPath}${documentTitle}`;

  await storage()
    .ref(documentPath)
    .putFile(url)
    .then(response => {
      const stroredDocumentPath = Metrics.isAndroid
        ? `${appConstants.storageDocumentPath}${response.metadata.name}`
        : `${response.metadata.name}`;

      storage()
        .ref(stroredDocumentPath)
        .getDownloadURL()
        .then(remoteDocumentUrl => {
          setDocumentData({
            documentUrl: remoteDocumentUrl,
            documentName: documentTitle,
          });
        });
    })
    .catch(error => alertMessage(error.message));
};

const requestCameraPermission = () => {
  return Metrics.isAndroid
    ? request(PERMISSIONS.ANDROID.CAMERA)
    : request(PERMISSIONS.IOS.CAMERA);
};

const requestGalleryPermission = () => {
  return Metrics.isAndroid
    ? request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
    : request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
};

const permissionAlert = (type: string) => {
  const permissionBlockedAlert =
    type === strings.cameraPermission
      ? strings.cameraPermissionBlocked
      : strings.galleryPermissionBlocked;

  Alert.alert(permissionBlockedAlert, strings.grantPermission, [
    { onPress: () => openSettings(), text: strings.goToSettings },
    { text: strings.cancel },
  ]);
};

const pickerCallback = (
  assets: Asset[] = [],
  setImagePath: Dispatch<React.SetStateAction<string>>,
) => {
  const { androidFolder, iosFolder } = appConstants;
  const filePath = generateFilePath(assets[0]?.fileName);
  const data = assets[0]?.base64 ?? '';
  const directory = Metrics.isAndroid ? androidFolder : iosFolder;

  RNFetchBlob.fs.isDir(directory).then(isDir => {
    if (isDir) {
      filePath && saveImage(filePath, data, setImagePath);
    } else {
      RNFetchBlob.fs
        .mkdir(directory)
        .then(() => filePath && saveImage(filePath, data, setImagePath))
        .catch(error => alertMessage(error.message));
    }
  });
};

const generateFilePath = (fileName: string = '') => {
  const { androidFolder, iosFolder, timestamp } = appConstants;

  if (fileName) {
    return Metrics.isAndroid
      ? `${androidFolder}/${timestamp}_${fileName}`
      : `${iosFolder}/${timestamp}_${fileName}`;
  }
};

const saveImage = (
  path: string,
  data: string,
  setImagePath: Dispatch<React.SetStateAction<string>>,
) => {
  RNFetchBlob.fs
    .createFile(path, data, 'base64')
    .then(() => getImage(path, setImagePath))
    .catch(error => alertMessage(error.message));
};

const getImage = (
  path: string,
  setImagePath: Dispatch<React.SetStateAction<string>>,
) => {
  RNFetchBlob.fs
    .readStream(path, 'base64')
    .then(({ path: imagePath }) => {
      setImagePath(imagePath);
    })
    .catch(error => alertMessage(error.message));
};

const openCamera = (setImagePath: Dispatch<React.SetStateAction<string>>) => {
  launchCamera({ mediaType: 'photo', ...pickerOptions })
    .then(
      ({ assets, didCancel }) =>
        !didCancel && pickerCallback(assets, setImagePath),
    )
    .catch(error => alertMessage(error.message));
};

const selectImage = (setImagePath: Dispatch<React.SetStateAction<string>>) => {
  launchImageLibrary({ mediaType: 'photo', ...pickerOptions })
    .then(
      ({ assets, didCancel }) =>
        !didCancel && pickerCallback(assets, setImagePath),
    )
    .catch(error => alertMessage(error.message));
};

export const clearChat = ({
  navigation,
  chatId,
  setShowMenu,
}: ClearChatDataType) => {
  Alert.alert(strings.areYouSure, strings.clearChatAlert, [
    { text: strings.cancel, onPress: () => setShowMenu(false) },
    {
      text: strings.ok,
      onPress: () => {
        firestore().collection(strings.chatCollection).doc(chatId).delete();
        setShowMenu(false);
        navigation.goBack();
      },
    },
  ]);
};

export const chatCreation = async (
  chatId: string,
  uid: string,
  content: string,
  type: string,
  documentData: DocumentStateDataType,
  setMessageList: Dispatch<React.SetStateAction<ChatDataType[]>>,
) => {
  const timeStamp = Date.now();
  let data = {};
  if (type === strings.document) {
    const { documentUrl, documentName } = documentData;
    data = {
      content: documentUrl,
      type,
      user: uid,
      time: timeStamp,
      documentName,
    };
  } else {
    data = {
      content,
      type,
      user: uid,
      time: timeStamp,
    };
  }

  const previousMessage = await firestore()
    .collection(strings.chatCollection)
    .doc(chatId)
    .get()
    .then(documentSnapshot => documentSnapshot.data());

  setMessageList([...(previousMessage?.messageList ?? ''), data]);
};

export const openDocument = (url: string, documentName: string) => {
  const filePath = Metrics.isAndroid
    ? `${appConstants.androidDocumentFolder}/${documentName}`
    : `${appConstants.iosDocumentFolder}/${documentName}`;
  const folderPath = Metrics.isAndroid
    ? appConstants.androidDocumentFolder
    : appConstants.iosDocumentFolder;

  RNFetchBlob.fs.isDir(folderPath).then(isDir => {
    if (!isDir) {
      RNFetchBlob.fs.mkdir(folderPath);
    }
  });

  RNFetchBlob.fs.exists(filePath).then(response => {
    response
      ? FileViewer.open(filePath)
          .then(openFileResponse => openFileResponse)
          .catch(() => alertMessage(strings.appCheck))
      : RNFetchBlob.config({
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: false,
            path: filePath,
          },
          path: filePath,
        })
          .fetch('GET', url)
          .then(documentPathResponse => {
            FileViewer.open(documentPathResponse?.data)
              .then(openFileResponse => openFileResponse)
              .catch(() => alertMessage(strings.appCheck));
          })
          .catch(error => {
            alertMessage(error);
          });
  });
};

export const addChatToFirestore = async (
  chatId: string,
  messageList: ChatDataType[],
) => {
  messageList.length !== 0 &&
    (await firestore()
      .collection(strings.chatCollection)
      .doc(chatId)
      .set({ messageList })
      .catch(error => error));
};
