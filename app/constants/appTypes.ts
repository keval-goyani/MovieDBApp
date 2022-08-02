import React, { Dispatch } from 'react';
import {
  Control,
  FormState,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormResetField,
} from 'react-hook-form';
import {
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { ImmutableArray } from 'seamless-immutable';
import { appReducer } from '../redux';

interface genresDataType {
  id: number;
  name: string;
}

interface ProductionCompaniesDataType {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountriesDataType {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguagesDataType {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface FormDataType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormTypeProps {
  getCredentials: React.Dispatch<
    React.SetStateAction<{ userName?: string; email: string; password: string }>
  >;
  type: string;
  form: {
    control: Control<FormDataType>;
    handleSubmit: UseFormHandleSubmit<FormDataType>;
    formState: FormState<FormDataType>;
    getValues: UseFormGetValues<FormDataType>;
    resetField: UseFormResetField<FormDataType>;
  };
}

interface CreditsDataType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}

interface MovieDetailsDataType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: genresDataType[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompaniesDataType[];
  production_countries: ProductionCountriesDataType[];
  release_date: string;
  first_air_date: string;
  revenue: number;
  runtime: number;
  episode_run_time: number[];
  spoken_languages: SpokenLanguagesDataType[];
  status: string;
  tagline: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: CreditsDataType[];
    crew: CreditsDataType[];
  };
}

type RootState = ReturnType<typeof appReducer>;

interface MovieSagaDataType {
  payload: {
    urlMainPath?: string;
    pageNo: number;
  };
  type: string;
}

interface DetailPathDataType {
  payload: string;
  type: string;
}

interface DetailResponseGenerator {
  config?: object;
  data: MovieDetailsDataType;
  duration?: number;
  headers?: object;
  ok?: boolean | null;
  originalError: string;
  problem: string;
  status?: number;
}

interface DetailStateDataType {
  detailData: MovieDetailsDataType | null;
  fetchingDetailData: boolean;
  DetailDataFetchingError: boolean;
}

interface DetailStoreDataType {
  data: MovieDetailsDataType;
  error: string;
}

interface ListItemDataType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  first_air_date?: string;
  title: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface ListItemType {
  page: number;
  results: Array<ListItemDataType>;
  total_pages: number;
  total_results: number;
}

interface DataType {
  id: number;
  name: string;
  endPoint: string;
}

interface ListContainerDataType {
  title?: string;
  filterOptions?: Array<DataType>;
  data: ImmutableArray<ListItemDataType>;
  fetchingState?: boolean;
  errorState?: boolean;
  listPage: number;
  searchModal: boolean;
}

interface ListDataType {
  fetching?: boolean;
  listData: Array<ListItemDataType>;
  searchModal: boolean;
  pageHandler: () => void;
  footerStyle: StyleProp<ViewStyle>;
  listType?: string;
  latestSkeletonStyle?: StyleProp<ViewStyle>;
}

interface MovieDataType {
  data: ImmutableArray<ListItemDataType> | Array<ListItemDataType>;
  listPage: listPageType;
}

interface listPageType {
  whatsPopularPage: number;
  freeToWatchPage: number;
  trendingPage: number;
}

interface MovieResponseGenerator {
  config?: object;
  data: ListItemType;
  duration?: number;
  headers?: object;
  ok?: boolean | null;
  originalError: string;
  problem: string;
  status?: number;
}

interface RouteDataType {
  route: {
    params: { id: number; data: string };
  };
}

interface PopularDataType {
  whatsPopularData: Array<ListItemDataType>;
  whatsPopularSearch: Array<ListItemDataType>;
  whatsPopularPage: number;
  fetchingWhatsPopularData: boolean;
  whatsPopularDataFetchingError: boolean;
}

interface FreeMovieDataType {
  freeToWatch: Array<ListItemDataType>;
  freeToWatchSearch: Array<ListItemDataType>;
  freeToWatchPage: number;
  fetchingFreeToWatch: boolean;
  freeToWatchFetchingError: boolean;
}

interface TrailerDataType {
  latestTrailers: Array<ListItemDataType>;
  latestTrailersSearch: Array<ListItemDataType>;
  latestTrailersPage: number;
  fetchingLatestTrailers: boolean;
  latestTrailersFetchingError: boolean;
}

interface TrendingDataType {
  trending: Array<ListItemDataType>;
  trendingSearch: Array<ListItemDataType>;
  trendingPage: number;
  fetchingTrending: boolean;
  trendingFetchingError: boolean;
}

interface HeaderDataType {
  leftIcon: ImageSourcePropType;
  logoIcon: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  searchModal?: boolean;
  setSearchModal?: Dispatch<React.SetStateAction<boolean>>;
  onPress?: () => void;
  title?: string;
}

interface NavigationDataType {
  navigate: (
    screen: string,
    params?: {
      id?: number;
      data?: string;
      conversationId?: string;
      username?: string;
      isFromChat?: boolean;
      currentLatitude?: number;
      currentLongitude?: number;
      lastLatitude?: number;
      lastLongitude?: number;
      receiverId?: string;
      userStatus?: string;
      profileImage?: string;
    },
  ) => void;
  openDrawer: () => void;
  replace: (screenName: string) => void;
  goBack: () => void;
}

interface DropDownDataType {
  data: Array<DataType>;
  title: string;
  dropDownViewStyle?: StyleProp<ViewStyle>;
  dropDownTextStyle?: StyleProp<TextStyle>;
  dropDownTintStyle?: StyleProp<ImageStyle>;
  setMethod: Dispatch<React.SetStateAction<string>>;
}

interface MovieStoreDataType {
  data: {
    movieData: object;
    page: number;
  };
  error: string;
  searchData: { type: string; searchData: ListItemDataType[] };
}

interface Credentials {
  username?: string;
  email: string;
  password: string;
}

interface NavigationScreenType {
  navigate: (Screen: string) => void;
}

interface AuthPayloadDataType {
  user: { _user: UserDataType };
  username?: string;
}

interface AuthSagaDataType {
  payload: AuthPayloadDataType;
  type: string;
}

interface LoginSagaDataType {
  payload: string;
  type: string;
}

interface AuthReduxDataType {
  data: UserDataType;
  error: string;
}

interface AuthStateDataType {
  user: null | UserDataType;
  authenticated: null | boolean;
  error: null | boolean;
  loading: boolean | null;
}
interface DrawerStateDataType {
  setActiveTab: selectDataTypes;
}

interface selectDataTypes {
  payload: string;
}

interface TabBarIconDataType {
  focused: boolean;
  icon: ImageProps;
}

interface SearchModalDataType {
  searchQuery: string;
  setSearchQuery: Dispatch<React.SetStateAction<string>>;
  setSearchModal: Dispatch<React.SetStateAction<boolean>>;
  searchModal: boolean;
}

interface SearchFunctionDataType {
  query: string;
  type: string;
}

interface LoaderDataType {
  size?: string | number;
  animating?: boolean;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

interface CustomDrawerDataType {
  descriptors?: object;
  navigation: {
    navigate: (routeName: string, { screen }: { screen: string }) => void;
  };
  state?: object;
}

interface ChatHeaderDataType {
  username: string;
  profileImage: string | undefined;
  userStatus: string | undefined;
  showMenu: boolean;
  setShowMenu: Dispatch<React.SetStateAction<boolean>>;
  setIsAttach: Dispatch<React.SetStateAction<boolean>>;
  setCameraModal: Dispatch<React.SetStateAction<boolean>>;
  setChatWallpaper: Dispatch<React.SetStateAction<string>>;
  receiverId: string | undefined;
  conversationId: string;
}

interface MessageDataType {
  key?: number;
  time: string;
  isLeft: boolean;
  type: string;
  message: string;
  documentName: string;
  chatUsername: string;
}
interface SkeletonProps {
  width: number;
  height: number;
}

interface LoadingStateProps {
  searchModal: boolean;
  latestSkeletonStyle: StyleProp<ViewStyle>;
}

interface UserListDataType {
  email: string;
  uid: string;
  username: string;
  profileImage: string;
  createdAt: number;
  status: string;
  latestMessage: {
    type: string;
    content: string;
    senderId: string;
    documentName?: string;
  };
}
interface UserListStateDataType {
  userList: UserListDataType[] | [];
  fetchingUserList: boolean | null;
}

interface ChatUserListType {
  data: UserListDataType[];
}

interface UserDataType {
  username: string;
  email: string;
  uid: string;
  profileImage: string;
  status: string;
}

interface ChatType {
  [conversationId: string]: ChatDataType;
}

interface ChatDataType {
  content: string;
  type: string;
  documentName?: string;
  createdAt: { _seconds: number; _nanoseconds: number };
  payload: '';
  sender: UserDataType;
  read: string[];
  status: string;
}

interface ChatStateDataType {
  fetchingChatData: boolean;
  chatData: [] | Array<ChatType>;
}

interface ChatLocalStoreDataType {
  chat: Array<ChatType>;
}

interface LocationDataType {
  currentLatitude: number | undefined;
  currentLongitude: number | undefined;
}

interface ChatInputDataType {
  cameraModal: boolean;
  isAttach: boolean;
  setCameraModal: Dispatch<React.SetStateAction<boolean>>;
  setIsAttach: Dispatch<React.SetStateAction<boolean>>;
  setImagePath: Dispatch<React.SetStateAction<string>>;
  setDocumentData: Dispatch<React.SetStateAction<DocumentStateDataType>>;
  setShowMenu: Dispatch<React.SetStateAction<boolean>>;
  documentData: DocumentStateDataType;
  conversationId: string;
  username: string;
  imageUrl: string;
  receiverId: string | undefined;
}

interface LatestMessageDataType {
  content?: string;
  type?: string;
  documentName?: string;
  createdAt?: { _seconds: number; _nanoseconds: number };
  payload?: '';
  sender?: UserDataType;
  read?: string[];
  status?: string;
}

interface ChatListDataType {
  email: string;
  uid: string;
  username: string;
  type: string;
  createdAt: { _seconds: number; _nanoseconds: number };
  content: string;
  time: number;
  senderId: string;
  receiverId: string;
}

interface ChatUserListDataType {
  chatUserList: Array<UserListDataType>;
}

interface ChatScreenDataType {
  route: {
    params: {
      conversationId: string;
      username: string;
      isFromChat?: boolean;
      lastLatitude?: number;
      lastLongitude?: number;
      currentLatitude?: number;
      currentLongitude?: number;
      receiverId?: string;
      userStatus?: string;
      profileImage?: string;
    };
  };
}

interface ChatListSagaDataType {
  payload: ChatListDataType[];
  type: string;
}

interface StaggerDataType {
  imagePath?: string;
  setCameraModal: Dispatch<React.SetStateAction<boolean>>;
  setImagePath: Dispatch<React.SetStateAction<string>>;
}

interface MessageListDataType {
  conversationId: string;
  username: string;
  setCameraModal: Dispatch<React.SetStateAction<boolean>>;
  setShowMenu: Dispatch<React.SetStateAction<boolean>>;
  setIsAttach: Dispatch<React.SetStateAction<boolean>>;
}

interface SetWallpaperDataType {
  wallpaperPath: string;
}

interface ChatMenuDataType {
  setChatWallpaper: Dispatch<React.SetStateAction<string>>;
  setShowMenu: Dispatch<React.SetStateAction<boolean>>;
  conversationId: string;
  receiverId: string | undefined;
}

interface CustomButtonDataType {
  onPress: () => void;
  buttonStyle: TextStyle;
  buttonTextStyle: TextStyle;
  buttonText: string;
}

interface ClearChatDataType {
  setShowMenu: Dispatch<React.SetStateAction<boolean>>;
  conversationId: string;
  receiverId: string | undefined;
  senderId: string;
}

interface LocationCoordsProps {
  endedLatitude: number;
  endedLongitude: number;
}

interface MapDataProps {
  isFromChat: boolean;
  longitude: number;
  latitude: number;
  lastLatitude: number;
  lastLongitude: number;
  conversationId?: string;
  username?: string;
}

interface CustomButtonProps {
  isFromChat: boolean;
  longitude: number;
  latitude: number;
  conversationId: string;
  receiverId: string | undefined;
}

interface ShareLocationDataProps {
  conversationId?: string;
  username?: string;
  currentLatitude?: number;
  currentLongitude?: number;
}

interface CustomHyperlinkDataType {
  linkTitle: string;
  hyperlinkTitle: string;
  onPress: () => void;
}

interface ShareDocumentProps {
  fileType: string;
  isLeft: boolean;
  message: string;
  documentName: string;
  time: string;
}

interface DocumentFooterProps {
  page: boolean;
  fileType: string;
  time: string;
}
interface ImageModalDataType {
  message: string;
  chatUsername: string;
  time: string;
  imageVisible: boolean;
  setImageVisible: Dispatch<React.SetStateAction<boolean>>;
  showImageDetail: boolean;
  setShowImageDetail: Dispatch<React.SetStateAction<boolean>>;
}

interface AttachDataType {
  setIsAttach: Dispatch<React.SetStateAction<boolean>>;
  setImagePath: Dispatch<React.SetStateAction<string>>;
  setDocumentData: Dispatch<React.SetStateAction<DocumentStateDataType>>;
  conversationId: string;
  username: string;
  receiverId: string | undefined;
}

interface CustomIconRounderDataType {
  path: ImageSourcePropType;
  iconName: string;
  tintColor?: ImageStyle;
  onPress: () => void;
  backgroundColor: ViewStyle;
}

interface ShareLocationDataType {
  conversationId: string;
  username: string;
}

interface LocationPropsType {
  chatUsername: string;
  message: string;
  isLeft: boolean;
  time: string;
}

interface DocumentStateDataType {
  documentUrl: string;
  documentName: string;
}

interface ImageMessageDataType {
  isLeft: boolean;
  message: string;
  time: string;
  chatUsername: string;
}

interface TextMessageDataType {
  isLeft: boolean;
  message: string;
  time: string;
}

interface UserToChatNavigationDataType {
  navigate: (
    screen: string,
    params: {
      conversationId: string;
      username: string;
      receiverId: string;
      userStatus: string;
      profileImage: string;
    },
  ) => void;
}
interface SearchUserProps {
  setUsersList: Dispatch<React.SetStateAction<ImmutableArray<UserDataType>>>;
}

interface AddUserListProps {
  userListData: ImmutableArray<UserDataType>;
}

interface UsersListStateDataType {
  userList: UserDataType[] | [];
  fetchingUserList: boolean;
}

interface ChatUsersListType {
  data: UserDataType[];
}

interface RenderItemTypes {
  item: UserDataType;
}

interface UsersDocumentDataType {
  email?: string;
  uid?: string;
  username?: string;
  profileImage?: string;
}

interface UserListEmptyType {
  fetching: boolean | null;
  userListLength: number;
}

interface LatestMessageProps {
  message: MessageProps;
  isSendByMe: boolean;
}

interface MessageProps {
  type: string;
  documentName?: string;
  content?: string;
}

interface EditProfileProps {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setImagePath: Dispatch<React.SetStateAction<string>>;
}
interface UserStatusDataType {
  status: string;
  type: string;
}

interface ChatSagaDataType {
  payload: {
    data: ChatDataType[];
    conversationId: string;
  };
  type: string;
}

interface ProfileImageDataType {
  profileImage: string;
  userStatus: string;
}

interface ProfileUpdateDataType {
  profile: string;
  type: string;
}

export type {
  AddUserListProps,
  AttachDataType,
  LatestMessageProps,
  AuthReduxDataType,
  AuthSagaDataType,
  AuthStateDataType,
  ChatDataType,
  RenderItemTypes,
  ChatHeaderDataType,
  ChatInputDataType,
  ChatListDataType,
  ChatListSagaDataType,
  ChatLocalStoreDataType,
  ChatMenuDataType,
  ChatScreenDataType,
  ChatStateDataType,
  ChatUserListDataType,
  ChatUserListType,
  ClearChatDataType,
  Credentials,
  CustomButtonDataType,
  CustomButtonProps,
  CustomDrawerDataType,
  CustomHyperlinkDataType,
  CustomIconRounderDataType,
  DataType,
  DetailPathDataType,
  DetailResponseGenerator,
  DetailStateDataType,
  DetailStoreDataType,
  DocumentFooterProps,
  DocumentStateDataType,
  DrawerStateDataType,
  DropDownDataType,
  EditProfileProps,
  FormDataType,
  FormTypeProps,
  FreeMovieDataType,
  HeaderDataType,
  ImageMessageDataType,
  ImageModalDataType,
  LatestMessageDataType,
  ListContainerDataType,
  ListDataType,
  ListItemDataType,
  ListItemType,
  LoaderDataType,
  LoadingStateProps,
  LocationCoordsProps,
  LocationDataType,
  LocationPropsType,
  MapDataProps,
  MessageDataType,
  MessageListDataType,
  MovieDataType,
  MovieDetailsDataType,
  MovieResponseGenerator,
  MovieSagaDataType,
  MovieStoreDataType,
  NavigationDataType,
  NavigationScreenType,
  PopularDataType,
  RootState,
  RouteDataType,
  SearchFunctionDataType,
  SearchModalDataType,
  SearchUserProps,
  SetWallpaperDataType,
  ShareDocumentProps,
  ShareLocationDataProps,
  ShareLocationDataType,
  SkeletonProps,
  StaggerDataType,
  TabBarIconDataType,
  TextMessageDataType,
  TrailerDataType,
  TrendingDataType,
  UserDataType,
  UserListDataType,
  UserListEmptyType,
  UserListStateDataType,
  UsersDocumentDataType,
  UsersListStateDataType,
  UserToChatNavigationDataType,
  UserStatusDataType,
  ChatSagaDataType,
  ChatType,
  ChatUsersListType,
  ProfileImageDataType,
  LoginSagaDataType,
  ProfileUpdateDataType,
};
