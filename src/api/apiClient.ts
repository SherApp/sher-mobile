import { config } from '../utils/config';
import axios, { AxiosInstance } from 'axios';
import {
  getSavedBaseUrl,
  getSavedRefreshToken,
  saveBaseUrl,
  saveTokens
} from './apiClientUtils';
import { authTokenInterceptor } from './authTokenInterceptor';
import {
  UserFile,
  refreshTokenInterceptor,
  FetchFilesCriteria,
  Directory,
  CreateDirectoryRequest
} from '@sherapp/sher-shared';

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

export interface EnhancedFile extends UserFile {
  url: string;
}

export class ApiClient {
  private _axiosClient: AxiosInstance | null = null;
  private readonly handleAuthRequired: AuthRequiredCallback;

  constructor(onAuthRequired: AuthRequiredCallback) {
    this.handleAuthRequired = onAuthRequired;
  }

  public async signIn({ instanceUrl, ...rest }: SignInRequest) {
    await saveBaseUrl(instanceUrl);

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

  public async getFiles(
    criteria?: FetchFilesCriteria
  ): Promise<EnhancedFile[]> {
    const client = await this.client();
    const { data } = await client.get<UserFile[]>(config.api.endpoints.file(), {
      params: {
        ...criteria
      }
    });

    return data.map((f) => this.enhanceFile(f, client.defaults.baseURL!));
  }

  public getFileUrl(fileId: string, baseUrl: string) {
    return new URL(config.api.endpoints.file(fileId), baseUrl).href;
  }

  public async listDirectory(directoryId?: string) {
    const client = await this.client();
    const { data } = await client.get<Directory>(
      config.api.endpoints.directory(directoryId)
    );

    return {
      ...data,
      files: data.files.map((f) =>
        this.enhanceFile(f, client.defaults.baseURL!)
      )
    };
  }

  public async createDirectory(request: CreateDirectoryRequest) {
    const client = await this.client();
    await client.post(config.api.endpoints.directory(), request);
  }

  public async deleteDirectory(directoryId: string) {
    const client = await this.client();
    await client.delete(config.api.endpoints.directory(directoryId));
  }

  private enhanceFile(file: UserFile, baseUrl: string) {
    return { ...file, url: this.getFileUrl(file.id, baseUrl) ?? '' };
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

    const baseUrl = await getSavedBaseUrl();

    this._axiosClient = axios.create({
      baseURL: baseUrl ? new URL('/api', baseUrl).href : undefined
    });

    if (!baseUrl) {
      this.handleAuthRequired();
    } else {
      await this.installInterceptors(this._axiosClient);
    }

    return this._axiosClient;
  }
}
