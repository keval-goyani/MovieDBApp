import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import apisauce from 'apisauce';
import CryptoJS from 'crypto-js';
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
  checkMultiple,
  openSettings,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
import { ImmutableObject } from 'seamless-immutable';
import {
  appConstants,
  ClearChatDataType,
  DetailResponseGenerator,
  DocumentStateDataType,
  genres,
  ListItemDataType,
  memberDataType,
  MovieDetailsDataType,
  MovieResponseGenerator,
  pickerOptions,
  strings,
  UserListDataType,
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

export const conversationIdCreation = (userIds: string[]) => {
  let concatId = '';
  userIds.sort().map(id => (concatId += id));
  return getHashCode(concatId);
};

const getHashCode = (id: string) => {
  return CryptoJS.MD5(id).toString();
};

export const handleCameraPermission = async (
  setImagePath: Dispatch<React.SetStateAction<string>>,
  isProfile: boolean = false,
) => {
  if (Metrics.isAndroid) {
    handleAndroidCameraPermission(setImagePath, isProfile);
  } else {
    check(appConstants.iosCameraPermission)
      .then(result => {
        switch (result) {
          case RESULTS.BLOCKED:
            permissionAlert(strings.cameraPermission);
            break;
          case RESULTS.DENIED:
            request(appConstants.iosCameraPermission);
            break;
          case RESULTS.UNAVAILABLE || RESULTS.LIMITED:
            alertMessage(strings.permissionUnavailable);
            break;
          default:
            openCamera(setImagePath, isProfile);
        }
      })
      .catch(error => {
        alertMessage(error.message);
      });
  }
};

export const handleAndroidCameraPermission = (
  setImagePath: Dispatch<React.SetStateAction<string>>,
  isProfile: boolean,
) => {
  checkMultiple([
    appConstants.androidCameraPermission,
    appConstants.storagePermission,
  ])
    .then(async results => {
      const isDenied =
        results[appConstants.androidCameraPermission] === 'denied' ||
        results[appConstants.storagePermission] === 'denied';
      const isBlocked =
        results[appConstants.androidCameraPermission] === 'blocked' ||
        results[appConstants.storagePermission] === 'blocked';
      const blockStatus = isBlocked ? strings.blocked : strings.camera;
      const permissionStatus = isDenied ? strings.denied : blockStatus;

      checkPermission(isBlocked, permissionStatus, setImagePath, isProfile);
    })
    .catch(error => error);
};

const checkPermission = async (
  isBlocked: boolean,
  permissionStatus: string,
  setImagePath: Dispatch<React.SetStateAction<string>>,
  isProfile: boolean,
) => {
  switch (permissionStatus) {
    case strings.denied:
      await requestMultiple([
        appConstants.androidCameraPermission,
        appConstants.storagePermission,
      ]);
      if (isBlocked) {
        permissionAlert(strings.cameraWithstorage);
      }
      break;
    case strings.blocked:
      permissionAlert(strings.cameraWithstorage);
      break;
    default:
      openCamera(setImagePath, isProfile);
      break;
  }
};

export const handleGalleryPermission = (
  setImagePath: Dispatch<React.SetStateAction<string>>,
  isProfile: boolean = false,
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
          selectImage(setImagePath, isProfile);
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
    check(appConstants.storagePermission).then(result => {
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

export const requestGalleryPermission = () => {
  return Metrics.isAndroid
    ? request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
    : request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
};

export const requestStoragePermission = () => {
  return request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
};

const permissionAlert = (type: string) => {
  let permissionBlockedAlert = '';

  switch (type) {
    case strings.camera:
      permissionBlockedAlert = strings.cameraPermissionBlocked;
      break;
    case strings.cameraWithstorage:
      permissionBlockedAlert = strings.cameraStoragePermissionBlocked;
      break;
    case strings.gallery:
    case strings.document:
      permissionBlockedAlert = strings.storagePermissionBlocked;
      break;
    default:
      break;
  }

  Alert.alert(permissionBlockedAlert, strings.grantPermission, [
    { onPress: () => openSettings(), text: strings.goToSettings },
    { text: strings.cancel },
  ]);
};

const pickerCallback = (
  assets: Asset[] = [],
  setImagePath: Dispatch<React.SetStateAction<string>>,
  isProfile: boolean,
) => {
  const { androidFolder, iosFolder, iosProfileFolder, androidProfileFolder } =
    appConstants;
  const androidDirectory = isProfile ? androidProfileFolder : androidFolder;
  const iosDirectory = isProfile ? iosProfileFolder : iosFolder;
  const filePath = generateFilePath(
    assets[0]?.fileName,
    androidDirectory,
    iosDirectory,
  );
  const data = assets[0]?.base64 ?? '';

  const directory = Metrics.isAndroid ? androidDirectory : iosDirectory;

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

const generateFilePath = (
  fileName: string = '',
  androidDirectory: string,
  iosDirectory: string,
) => {
  const { timestamp } = appConstants;

  if (fileName) {
    return Metrics.isAndroid
      ? `${androidDirectory}/${timestamp}_${fileName}`
      : `${iosDirectory}/${timestamp}_${fileName}`;
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

const openCamera = (
  setImagePath: Dispatch<React.SetStateAction<string>>,
  isProfile: boolean,
) => {
  launchCamera({ mediaType: 'photo', ...pickerOptions })
    .then(
      ({ assets, didCancel }) =>
        !didCancel && pickerCallback(assets, setImagePath, isProfile),
    )
    .catch(error => alertMessage(error.message));
};

const selectImage = (
  setImagePath: Dispatch<React.SetStateAction<string>>,
  isProfile: boolean,
) => {
  launchImageLibrary({ mediaType: 'photo', ...pickerOptions })
    .then(
      ({ assets, didCancel }) =>
        !didCancel && pickerCallback(assets, setImagePath, isProfile),
    )
    .catch(error => alertMessage(error.message));
};

export const clearChat = ({
  conversationId,
  setShowMenu,
  receiverId,
  senderId,
}: ClearChatDataType) => {
  Alert.alert(strings.areYouSure, strings.clearChatAlert, [
    { text: strings.cancel, onPress: () => setShowMenu(false) },
    {
      text: strings.ok,
      onPress: async () => {
        setShowMenu(false);
        await clearDataHandler(conversationId, receiverId, senderId);
      },
    },
  ]);
};

const clearDataHandler = async (
  conversationId: string,
  receiverId: string = '',
  senderId: string,
) => {
  const messageBatch = firestore().batch();
  const conversationBatch = firestore().batch();

  await appConstants.messageRef
    .doc(conversationId)
    .collection(strings.messageCollection)
    .get()
    .then(async messages => {
      messages?.docs?.forEach(messageData =>
        messageBatch?.delete(messageData?.ref),
      );
      messageBatch?.commit();

      await appConstants.conversationRef
        .doc(conversationId)
        .get()
        .then(conversation => {
          conversationBatch?.delete(conversation?.ref);
        })
        .catch(error => error);

      await deleteChatRef(senderId, conversationId, conversationBatch);
      await deleteChatRef(receiverId, conversationId, conversationBatch);

      conversationBatch?.commit();
    })
    .catch(error => error);
};

const deleteChatRef = async (
  id: string,
  conversationId: string,
  conversationBatch: FirebaseFirestoreTypes.WriteBatch,
) => {
  await appConstants.chatRef
    .doc(id)
    .collection(strings.conversationsCollection)
    .doc(conversationId)
    .get()
    .then(chat => {
      conversationBatch?.delete(chat?.ref);
    })
    .catch(error => error);
};

export const chatCreation = async ({
  conversationId,
  senderId,
  receiverId,
  content,
  type,
  members = {},
  documentName = '',
}: {
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: string;
  documentName?: string;
  members?: memberDataType;
}) => {
  let message = {};
  const membersData = receiverId
    ? {
        [senderId]: await userData(senderId),
        [receiverId]: await userData(receiverId),
      }
    : members;
  const payload = receiverId ? strings.emptyString : strings.group;
  const membersId = Object.keys(membersData);
  const fixedMessage = { content, type };
  const createdAt = appConstants.firebaseTimestamp;
  const conversationDocumentRef =
    appConstants.conversationRef.doc(conversationId);

  if (documentName) {
    message = {
      ...fixedMessage,
      documentName,
    };
  } else {
    message = fixedMessage;
  }
  const latestMessage = { ...message, senderId };
  const conversationMessage = {
    members: membersData,
    updatedAt: createdAt,
    conversationId,
    latestMessage,
  };
  const recentMessageData = {
    senderId,
    membersId,
    conversationId,
    message,
    payload,
  };

  await conversationDocumentRef.get().then(document => {
    if (document.exists) {
      conversationDocumentRef
        .update({ latestMessage, updatedAt: createdAt })
        .then(() => {
          addRecentMessageToUserList(recentMessageData);
        })
        .catch(error => error);
    } else {
      conversationDocumentRef
        .set({
          ...conversationMessage,
          createdAt,
        })
        .then(() => {
          addRecentMessageToUserList(recentMessageData);
        })
        .catch(error => error);
    }
  });
};

export const addRecentMessageToUserList = async ({
  senderId,
  membersId,
  conversationId,
  message,
  payload,
}: {
  senderId: string;
  membersId: string[];
  conversationId: string;
  message: { content: string; type: string; documentName?: string } | {};
  payload: string;
}) => {
  const batch = firestore().batch();
  let totalChat = 0;
  const receiversId = membersId.filter(id => id !== senderId);
  const data = {
    ...message,
    createdAt: appConstants.firebaseTimestamp,
    sender: await userData(senderId),
    status: strings.sentStatus,
    read: receiversId,
    payload,
  };

  await appConstants.messageRef
    .doc(conversationId)
    .collection(strings.messageCollection)
    .add(data)
    .then(() => {
      membersId.forEach(async userId => {
        await updateChatCollection(userId, conversationId, batch);
        totalChat = totalChat + 1;

        if (totalChat === membersId.length) {
          batch.commit();
        }
      });
    })
    .catch(error => error);
};

const updateChatCollection = async (
  id: string,
  conversationId: string,
  batch: FirebaseFirestoreTypes.WriteBatch,
) => {
  await appConstants.chatRef
    .doc(id)
    .collection(strings.conversationsCollection)
    .doc(conversationId)
    .get()
    .then(chatData => {
      batch.set(chatData?.ref, { unReadCount: 0 });
    })
    .catch(error => error);
};

export const userData = async (id: string) => {
  return await appConstants.userRef
    .doc(id)
    .get()
    .then(user => user?.data());
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

export const convertToTimestamp = (createdAt: {
  _seconds: number;
  _nanoseconds: number;
}) => {
  return new Date(
    (createdAt?._seconds + createdAt?._nanoseconds * 10 ** -9) * 1000,
  ).getTime();
};

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, appConstants.key).toString();
};

export const decryptData = (cipherText: string) => {
  return CryptoJS.AES.decrypt(cipherText, appConstants.key).toString(
    CryptoJS.enc.Utf8,
  );
};

export const loginError = (errorCode: string) => {
  switch (errorCode) {
    case strings.invalidPasswordErrorCode:
      return strings.invalidPasswordMessage;
    case strings.networkRequestErrorCode:
    case strings.unknownNetworkErrorCode:
      return strings.networkRequestErrorMessage;
    case strings.userNotFoundErrorCode:
      return strings.userNotFoundMessage;
    default:
      return strings.serverErrorMessage;
  }
};

export const signUpError = (errorCode: string) => {
  switch (errorCode) {
    case strings.existEmailErrorCode:
      return strings.existEmailMessage;
    case strings.invalidEmailErrorCode:
      return strings.invalidEmailMessage;
    case strings.networkRequestErrorCode:
    case strings.unknownNetworkErrorCode:
      return strings.networkRequestErrorMessage;
    default:
      return strings.serverErrorMessage;
  }
};

export const getConversationIds = async (
  userList: UserListDataType[],
  userId: string,
) => {
  return userList.length === 0
    ? await appConstants.chatRef
        .doc(userId)
        .collection(strings.conversationsCollection)
        .get()
        .then(conversations => {
          return conversations.docs.map(conversation => conversation.id);
        })
        .catch(error => error)
    : userList.map((conversationUser: UserListDataType) => {
        return conversationUser?.conversationId;
      });
};

export const alertBox = (
  okButtonHandler: () => void,
  alertTitle: string = strings.warning,
  alertDescription: string = strings.confirm,
) => {
  Alert.alert(alertTitle, alertDescription, [
    {
      text: strings.cancel,
      style: 'cancel',
    },
    {
      text: strings.ok,
      onPress: okButtonHandler,
    },
  ]);
};

export const storeImageToStorage = ({
  imagePath,
  setImagePath,
  setImageUrl,
}: {
  imagePath: string;
  setImagePath: Dispatch<React.SetStateAction<string>>;
  setImageUrl: Dispatch<React.SetStateAction<string>>;
}) => {
  const selectedImage = imagePath?.split('/');
  const imageName = selectedImage?.[selectedImage?.length - 1];
  const storagePath = `${appConstants.storageProfilePath}${imageName}`;

  storage()
    .ref(storagePath)
    .putFile(imagePath)
    .then(async response => {
      const stroredImagePath = Metrics.isAndroid
        ? `${appConstants.storageProfilePath}${response?.metadata?.name}`
        : `${response?.metadata?.name}`;

      await storage()
        .ref(stroredImagePath)
        .getDownloadURL()
        .then(remoteImage => {
          setImageUrl(remoteImage);
          setImagePath('');
        })
        .catch(error => alertMessage(error));
    })
    .catch(error => alertMessage(error));
};

export const groupCreation = async ({
  conversationId,
  members,
  usersId,
  groupInitializerId,
  createdBy,
  groupImage,
  groupName,
}: {
  conversationId: string;
  members: { [id: string]: string };
  usersId: string[];
  groupInitializerId: string;
  createdBy: string;
  groupImage: string;
  groupName: string;
}) => {
  let totalChat = 0;
  const createdAt = appConstants.firebaseTimestamp;
  const batch = firestore().batch();
  const latestMessage = {
    members,
    groupInitializerId,
    createdBy,
    groupImage,
    groupName,
    createdAt,
    updatedAt: createdAt,
    conversationId,
    latestMessage: {
      content: `${strings.createdGroup} ${groupName}`,
      type: strings.textMessageType,
      senderId: strings.emptyString,
    },
  };
  appConstants.conversationRef.doc(conversationId).set(latestMessage);

  usersId.forEach(async userId => {
    await updateChatCollection(userId, conversationId, batch);
    totalChat = totalChat + 1;
    if (totalChat === usersId.length) {
      batch.commit();
    }
  });
};
