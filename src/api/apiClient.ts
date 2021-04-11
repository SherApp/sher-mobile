import { config } from '../utils/config';
import axios, { AxiosInstance } from 'axios';
import { getSavedRefreshToken, saveTokens } from './apiClientUtils';
import { authTokenInterceptor } from './authTokenInterceptor';
import { UserFile } from '@sherapp/sher-shared/browseFiles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshTokenInterceptor } from '@sherapp/sher-shared/auth';

interface SignInRequest {
  emailAddress: string;
  password: string;
  instanceUrl: string;
}

export interface AuthenticationResponse {
  jwtToken: string;
  refreshToken: string;
}

type AuthRequiredCallback = () => void;

const API_BASE_URL_STORAGE_KEY: string = 'API_BASE_URL';

export class ApiClient {
  private _axiosClient: AxiosInstance | null = null;
  private readonly handleAuthRequired: AuthRequiredCallback;

  constructor(onAuthRequired: AuthRequiredCallback) {
    this.handleAuthRequired = onAuthRequired;
  }

  public async signIn({ instanceUrl, ...rest }: SignInRequest) {
    const baseUrl = new URL('/api', instanceUrl).href;
    await AsyncStorage.setItem(API_BASE_URL_STORAGE_KEY, baseUrl);

    const client = await this.client();
    const { data } = await client.post<AuthenticationResponse>(
      config.api.endpoints.token.new,
      rest,
      {
        params: {
          asCookie: false
        }
      }
    );

    await AsyncStorage.setItem(API_BASE_URL_STORAGE_KEY, baseUrl);
    await saveTokens(data.jwtToken, data.refreshToken);
  }

  public async refreshToken() {
    const refreshToken = await getSavedRefreshToken();
    const client = await this.client();
    const { data } = await client.post<AuthenticationResponse>(
      config.api.endpoints.token.root,
      {
        refreshToken
      }
    );

    await saveTokens(data.jwtToken, data.refreshToken);
  }

  public async getFiles() {
    const client = await this.client();
    const { data } = await client.get<UserFile[]>(
      config.api.endpoints.fileUpload
    );
    return data;
  }

  private async installInterceptors(client: AxiosInstance) {
    client.interceptors.request.use(authTokenInterceptor);
    client.interceptors.response.use(
      undefined,
      refreshTokenInterceptor(
        client,
        this.handleAuthRequired,
        this.refreshToken.bind(this),
        config.api.endpoints.token.root
      )
    );
  }

  private async client() {
    if (this._axiosClient) {
      return this._axiosClient;
    }

    const baseUrl = await AsyncStorage.getItem(API_BASE_URL_STORAGE_KEY);

    this._axiosClient = axios.create({
      baseURL: baseUrl ?? undefined
    });

    if (!baseUrl) {
      this.handleAuthRequired();
    } else {
      await this.installInterceptors(this._axiosClient);
    }

    return this._axiosClient;
  }
}
