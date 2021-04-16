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

export interface EnhancedFile extends UserFile {
  url: string;
}

export class ApiClient {
  private _axiosClient: AxiosInstance | null = null;
  private filesUrl: string | null = null;
  private readonly handleAuthRequired: AuthRequiredCallback;

  constructor(onAuthRequired: AuthRequiredCallback) {
    this.handleAuthRequired = onAuthRequired;
  }

  public async signIn({ instanceUrl, ...rest }: SignInRequest) {
    await AsyncStorage.setItem(API_BASE_URL_STORAGE_KEY, instanceUrl);

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

  public async getFiles(): Promise<EnhancedFile[]> {
    const client = await this.client();
    const { data } = await client.get<UserFile[]>(
      config.api.endpoints.fileUpload
    );

    return data.map((f) => ({ ...f, url: this.getFileUrl(f) ?? '' }));
  }

  public getFileUrl({ id, fileName }: Pick<UserFile, 'id' | 'fileName'>) {
    if (this.filesUrl) {
      return new URL(`${id}/${fileName}`, this.filesUrl).href;
    }
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
      baseURL: baseUrl ? new URL('/api', baseUrl).href : undefined
    });

    if (!baseUrl) {
      this.handleAuthRequired();
    } else {
      this.filesUrl = new URL('/u', baseUrl).href;
      await this.installInterceptors(this._axiosClient);
    }

    return this._axiosClient;
  }
}
