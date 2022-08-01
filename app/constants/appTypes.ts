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
import rootReducer from '../redux';

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

export interface FormDataType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormTypeProps {
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

export interface MovieDetailsDataType {
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

export type RootState = ReturnType<typeof rootReducer>;

export interface MovieSagaDataType {
  payload: {
    urlMainPath?: string;
    pageNo: number;
  };
  type: string;
}

export interface DetailPathDataType {
  payload: string;
  type: string;
}

export interface DetailResponseGenerator {
  config?: object;
  data: MovieDetailsDataType;
  duration?: number;
  headers?: object;
  ok?: boolean | null;
  originalError: string;
  problem: string;
  status?: number;
}

export interface DetailStateDataType {
  detailData: MovieDetailsDataType | null;
  fetchingDetailData: boolean;
  DetailDataFetchingError: boolean;
}

export interface DetailStoreDataType {
  data: MovieDetailsDataType;
  error: string;
}

export interface ListItemDataType {
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

export interface ListItemType {
  page: number;
  results: Array<ListItemDataType>;
  total_pages: number;
  total_results: number;
}

export interface DataType {
  id: number;
  name: string;
  endPoint: string;
}

export interface ListContainerDataType {
  title?: string;
  filterOptions?: Array<DataType>;
  data: ImmutableArray<ListItemDataType>;
  fetchingState?: boolean;
  errorState?: boolean;
  listPage: number;
  searchModal: boolean;
}

export interface ListDataType {
  fetching?: boolean;
  listData: Array<ListItemDataType>;
  searchModal: boolean;
  pageHandler: () => void;
  footerStyle: StyleProp<ViewStyle>;
  listType?: string;
  latestSkeletonStyle?: StyleProp<ViewStyle>;
}

export interface MovieDataType {
  data: ImmutableArray<ListItemDataType> | Array<ListItemDataType>;
  listPage: listPageType;
}

export interface listPageType {
  whatsPopularPage: number;
  freeToWatchPage: number;
  trendingPage: number;
}

export interface MovieResponseGenerator {
  config?: object;
  data: ListItemType;
  duration?: number;
  headers?: object;
  ok?: boolean | null;
  originalError: string;
  problem: string;
  status?: number;
}

export interface RouteDataType {
  route: {
    params: { id: number; data: string };
  };
}

export interface PopularDataType {
  whatsPopularData: Array<ListItemDataType>;
  whatsPopularSearch: Array<ListItemDataType>;
  whatsPopularPage: number;
  fetchingWhatsPopularData: boolean;
  whatsPopularDataFetchingError: boolean;
}

export interface FreeMovieDataType {
  freeToWatch: Array<ListItemDataType>;
  freeToWatchSearch: Array<ListItemDataType>;
  freeToWatchPage: number;
  fetchingFreeToWatch: boolean;
  freeToWatchFetchingError: boolean;
}

export interface TrailerDataType {
  latestTrailers: Array<ListItemDataType>;
  latestTrailersSearch: Array<ListItemDataType>;
  latestTrailersPage: number;
  fetchingLatestTrailers: boolean;
  latestTrailersFetchingError: boolean;
}

export interface TrendingDataType {
  trending: Array<ListItemDataType>;
  trendingSearch: Array<ListItemDataType>;
  trendingPage: number;
  fetchingTrending: boolean;
  trendingFetchingError: boolean;
}

export interface HeaderDataType {
  leftIcon: ImageSourcePropType;
  logoIcon: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  searchModal?: boolean;
  setSearchModal?: Dispatch<React.SetStateAction<boolean>>;
  onPress?: () => void;
  title?: string;
}

export interface NavigationDataType {
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
    },
  ) => void;
  openDrawer: () => void;
  replace: (screenName: string) => void;
  goBack: () => void;
}

export interface DropDownDataType {
  data: Array<DataType>;
  title: string;
  dropDownViewStyle?: StyleProp<ViewStyle>;
  dropDownTextStyle?: StyleProp<TextStyle>;
  dropDownTintStyle?: StyleProp<ImageStyle>;
  setMethod: Dispatch<React.SetStateAction<string>>;
}

export interface MovieStoreDataType {
  data: {
    movieData: object;
    page: number;
  };
  error: string;
  searchData: { type: string; searchData: ListItemDataType[] };
}

export interface Credentials {
  username?: string;
  email: string;
  password: string;
}

export interface NavigationScreenType {
  navigate: (Screen: string) => void;
}

export interface AuthDataType {
  username: string;
  email: string;
  uid: string;
}

interface AuthPayloadDataType {
  user: { _user: AuthDataType };
  username?: string;
}

export interface AuthSagaDataType {
  payload: AuthPayloadDataType;
  type: string;
}

export interface AuthReduxDataType {
  data: AuthDataType;
  error: string;
}

export interface AuthStateDataType {
  user: null | AuthDataType;
  authenticated: null | boolean;
  error: null | boolean;
  loading: boolean | null;
}
export interface DrawerStateDataType {
  setActiveTab: selectDataTypes;
}

export interface selectDataTypes {
  payload: string;
}

export interface TabBarIconDataType {
  focused: boolean;
  icon: ImageProps;
}

export interface SearchModalDataType {
  searchQuery: string;
  setSearchQuery: Dispatch<React.SetStateAction<string>>;
  setSearchModal: Dispatch<React.SetStateAction<boolean>>;
  searchModal: boolean;
}

export interface SearchFunctionDataType {
  query: string;
  type: string;
}

export interface LoaderDataType {
  size?: string | number;
  animating?: boolean;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

export interface CustomDrawerDataType {
  descriptors?: object;
  navigation: {
    navigate: (routeName: string, { screen }: { screen: string }) => void;
  };
  state?: object;
}

export interface ChatHeaderDataType {
  username: string;
  picture: ImageSourcePropType;
  onlineStatus: string;
  showMenu: boolean;
  setShowMenu: Dispatch<React.SetStateAction<boolean>>;
  setIsAttach: Dispatch<React.SetStateAction<boolean>>;
  setCameraModal: Dispatch<React.SetStateAction<boolean>>;
  setChatWallpaper: Dispatch<React.SetStateAction<string>>;
  receiverId: string | undefined;
  conversationId: string;
}

export interface MessageDataType {
  key?: number;
  time: string;
  isLeft: boolean;
  type: string;
  message: string;
  documentName: string;
  chatUsername: string;
}
export interface SkeletonProps {
  width: number;
  height: number;
}

export interface LoadingStateProps {
  searchModal: boolean;
  latestSkeletonStyle: StyleProp<ViewStyle>;
}

export interface UserListDataType {
  email: string;
  uid: string;
  username: string;
  profileImage: string;
  createdAt: number;
  latestMessage: {
    type: string;
    content: string;
    senderId: string;
    documentName?: string;
  };
}
export interface UserListStateDataType {
  userList: UserListDataType[] | [];
  fetchingUserList: boolean | null;
}

export interface ChatUserListType {
  data: UserListDataType[];
}

export interface UserDataType extends AuthDataType {
  profileImage: string;
}

export interface ChatDataType {
  content: string;
  type: string;
  documentName?: string;
  createdAt: { _seconds: number; _nanoseconds: number };
  payload: '';
  sender: UserDataType;
  read: string[];
  status: string;
}

export interface ChatStateDataType {
  fetchingChatData: boolean;
  chatData: [] | ChatDataType[];
}

export interface ChatLocalStoreDataType {
  chat: ChatDataType[];
}

export interface LocationDataType {
  currentLatitude: number | undefined;
  currentLongitude: number | undefined;
}

export interface ChatInputDataType {
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

export interface LatestMessageDataType {
  content?: string;
  type?: string;
  documentName?: string;
  createdAt?: { _seconds: number; _nanoseconds: number };
  payload?: '';
  sender?: UserDataType;
  read?: string[];
  status?: string;
}

export interface ChatListDataType {
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

export interface ChatUserListDataType {
  chatUserList: Array<UserListDataType>;
}

export interface ChatScreenDataType {
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
    };
  };
}

export interface FireStoreResponseDataType {
  _data: {
    email: string;
    uid: string;
    username: string;
  };
}

export interface ChatListSagaDataType {
  payload: ChatListDataType[];
  type: string;
}
export interface UsersListSagaDataType {
  payload: UsersListDataType[];
  type: string;
}
export interface StaggerDataType {
  imagePath?: string;
  setCameraModal: Dispatch<React.SetStateAction<boolean>>;
  setImagePath: Dispatch<React.SetStateAction<string>>;
}

export interface MessageListDataType {
  conversationId: string;
  username: string;
  setCameraModal: Dispatch<React.SetStateAction<boolean>>;
  setShowMenu: Dispatch<React.SetStateAction<boolean>>;
  setIsAttach: Dispatch<React.SetStateAction<boolean>>;
}

export interface SetWallpaperDataType {
  wallpaperPath: string;
}

export interface ChatMenuDataType {
  setChatWallpaper: Dispatch<React.SetStateAction<string>>;
  setShowMenu: Dispatch<React.SetStateAction<boolean>>;
  conversationId: string;
  receiverId: string | undefined;
}

export interface CustomButtonDataType {
  onPress: () => void;
  buttonStyle: TextStyle;
  buttonTextStyle: TextStyle;
  buttonText: string;
}

export interface ClearChatDataType {
  setShowMenu: Dispatch<React.SetStateAction<boolean>>;
  conversationId: string;
  receiverId: string | undefined;
  senderId: string;
}

export interface LocationCoordsProps {
  endedLatitude: number;
  endedLongitude: number;
}

export interface MapDataProps {
  isFromChat: boolean;
  longitude: number;
  latitude: number;
  lastLatitude: number;
  lastLongitude: number;
  conversationId?: string;
  username?: string;
}

export interface CustomButtonProps {
  isFromChat: boolean;
  longitude: number;
  latitude: number;
  conversationId: string;
  receiverId: string | undefined;
}

export interface ShareLocationDataProps {
  conversationId?: string;
  username?: string;
  currentLatitude?: number;
  currentLongitude?: number;
}

export interface CustomHyperlinkDataType {
  linkTitle: string;
  hyperlinkTitle: string;
  onPress: () => void;
}

export interface ShareDocumentProps {
  fileType: string;
  isLeft: boolean;
  message: string;
  documentName: string;
  time: string;
}

export interface DocumentFooterProps {
  page: boolean;
  fileType: string;
  time: string;
}
export interface ImageModalDataType {
  message: string;
  chatUsername: string;
  time: string;
  imageVisible: boolean;
  setImageVisible: Dispatch<React.SetStateAction<boolean>>;
  showImageDetail: boolean;
  setShowImageDetail: Dispatch<React.SetStateAction<boolean>>;
}

export interface AttachDataType {
  setIsAttach: Dispatch<React.SetStateAction<boolean>>;
  setImagePath: Dispatch<React.SetStateAction<string>>;
  setDocumentData: Dispatch<React.SetStateAction<DocumentStateDataType>>;
  conversationId: string;
  username: string;
  receiverId: string | undefined;
}

export interface CustomIconRounderDataType {
  path: ImageSourcePropType;
  iconName: string;
  tintColor?: ImageStyle;
  onPress: () => void;
  backgroundColor: ViewStyle;
}

export interface ShareLocationDataType {
  conversationId: string;
  username: string;
}

export interface LocationPropsType {
  chatUsername: string;
  message: string;
  isLeft: boolean;
  time: string;
}

export interface DocumentStateDataType {
  documentUrl: string;
  documentName: string;
}

export interface ImageMessageDataType {
  isLeft: boolean;
  message: string;
  time: string;
  chatUsername: string;
}

export interface TextMessageDataType {
  isLeft: boolean;
  message: string;
  time: string;
}

export interface UserToChatNavigationDataType {
  navigate: (
    screen: string,
    params: {
      conversationId: string;
      username: string;
      receiverId: string;
    },
  ) => void;
}
export interface SearchUserProps {
  setUsersList: Dispatch<
    React.SetStateAction<ImmutableArray<UsersListDataType>>
  >;
}

export interface AddUserListProps {
  userListData: ImmutableArray<UsersListDataType>;
}

export interface UsersListStateDataType {
  userList: UsersListDataType[] | [];
  fetchingUserList: boolean;
}

export interface UsersListDataType {
  email: string;
  uid: string;
  username: string;
  profileImage: string;
}

export interface RenderItemTypes {
  item: {
    email: string;
    uid: string;
    username: string;
    profileImage: string;
  };
}

export interface UsersDocumentDataType {
  email?: string;
  uid?: string;
  username?: string;
  profileImage?: string;
}
export interface ChatUsersListType {
  data: UsersListDataType[];
}

export interface UserListEmptyType {
  fetching: boolean | null;
  userListLength: number;
}

export interface LatestMessageProps {
  message: MessageProps;
  isSendByMe: boolean;
}

export interface MessageProps {
  type: string;
  documentName?: string;
  content?: string;
}

export interface EditProfileProps {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setImagePath: Dispatch<React.SetStateAction<string>>;
}
