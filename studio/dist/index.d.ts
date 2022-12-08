import { AnyZodObject } from 'zod';

interface ISchema {
    name: string;
    validator: AnyZodObject;
}
interface IManuscriptStudioProps {
    accessToken: string;
    schemas: ISchema[];
}
declare const ManuscriptStudio: (props: IManuscriptStudioProps) => JSX.Element;

declare type ApiRequestOptions = {
    readonly method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';
    readonly url: string;
    readonly path?: Record<string, any>;
    readonly cookies?: Record<string, any>;
    readonly headers?: Record<string, any>;
    readonly query?: Record<string, any>;
    readonly formData?: Record<string, any>;
    readonly body?: any;
    readonly mediaType?: string;
    readonly responseHeader?: string;
    readonly errors?: Record<number, string>;
};

declare type ApiResult = {
    readonly url: string;
    readonly ok: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly body: any;
};

declare class ApiError extends Error {
    readonly url: string;
    readonly status: number;
    readonly statusText: string;
    readonly body: any;
    readonly request: ApiRequestOptions;
    constructor(request: ApiRequestOptions, response: ApiResult, message: string);
}

declare class CancelError extends Error {
    constructor(message: string);
    get isCancelled(): boolean;
}
interface OnCancel {
    readonly isResolved: boolean;
    readonly isRejected: boolean;
    readonly isCancelled: boolean;
    (cancelHandler: () => void): void;
}
declare class CancelablePromise<T> implements Promise<T> {
    readonly [Symbol.toStringTag]: string;
    private _isResolved;
    private _isRejected;
    private _isCancelled;
    private readonly _cancelHandlers;
    private readonly _promise;
    private _resolve?;
    private _reject?;
    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void, onCancel: OnCancel) => void);
    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): Promise<T | TResult>;
    finally(onFinally?: (() => void) | null): Promise<T>;
    cancel(): void;
    get isCancelled(): boolean;
}

declare type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
declare type Headers = Record<string, string>;
declare type OpenAPIConfig = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    CREDENTIALS: 'include' | 'omit' | 'same-origin';
    TOKEN?: string | Resolver<string>;
    USERNAME?: string | Resolver<string>;
    PASSWORD?: string | Resolver<string>;
    HEADERS?: Headers | Resolver<Headers>;
    ENCODE_PATH?: (path: string) => string;
};
declare const OpenAPI: OpenAPIConfig;

declare class AccessTokensService {
    /**
     * Add your access token as an Authorization Bearer token. This endpoint returns information about the token, including the organization that it provides read/write privileges for.
     * @returns any Successful response
     * @throws ApiError
     */
    static queryAccessTokensTest(): CancelablePromise<{
        id: string;
        createdAt: string;
        organizationId: number | null;
    }>;
}

declare class OrganizationsService {
    /**
     * This endpoint returns information about an organization if it exists. If your access token does not have sufficient priviliges, you will receive a FORBIDDEN reponse.
     * @param id
     * @returns any Successful response
     * @throws ApiError
     */
    static queryOrganizationsFindUnique(id: number): CancelablePromise<{
        id: number;
        createdAt: string;
        clerkOrganizationId: string;
        clerkOrganizationName?: string;
    }>;
}

declare class PostsService {
    /**
     * @returns any Successful response
     * @throws ApiError
     */
    static queryPostsFindMany(): CancelablePromise<Array<{
        id: number;
        slug: string;
        createdAt: string;
        updatedAt?: string;
        content?: string;
    }>>;
    /**
     * @param id
     * @returns any Successful response
     * @throws ApiError
     */
    static queryPostsFindUnique(id: number): CancelablePromise<{
        id: number;
        slug: string;
        createdAt: string;
        updatedAt?: string;
        content?: string;
    }>;
    /**
     * @param requestBody
     * @returns any Successful response
     * @throws ApiError
     */
    static mutationPostsUpdate(requestBody: {
        id: number;
        slug?: string;
        content?: string;
    }): CancelablePromise<{
        id: number;
        slug: string;
        createdAt: string;
        updatedAt?: string;
        content?: string;
    }>;
    /**
     * @param requestBody
     * @returns any Successful response
     * @throws ApiError
     */
    static mutationPostsCreate(requestBody: {
        slug: string;
        content?: string;
    }): CancelablePromise<{
        id: number;
        slug: string;
        createdAt: string;
        updatedAt?: string;
        content?: string;
    }>;
    /**
     * @param id
     * @returns any Successful response
     * @throws ApiError
     */
    static mutationPostsDelete(id: number): CancelablePromise<{
        id: number;
        slug: string;
        createdAt: string;
        updatedAt?: string;
        content?: string;
    }>;
}

type index_ApiError = ApiError;
declare const index_ApiError: typeof ApiError;
type index_CancelablePromise<T> = CancelablePromise<T>;
declare const index_CancelablePromise: typeof CancelablePromise;
type index_CancelError = CancelError;
declare const index_CancelError: typeof CancelError;
declare const index_OpenAPI: typeof OpenAPI;
type index_OpenAPIConfig = OpenAPIConfig;
type index_AccessTokensService = AccessTokensService;
declare const index_AccessTokensService: typeof AccessTokensService;
type index_OrganizationsService = OrganizationsService;
declare const index_OrganizationsService: typeof OrganizationsService;
type index_PostsService = PostsService;
declare const index_PostsService: typeof PostsService;
declare namespace index {
  export {
    index_ApiError as ApiError,
    index_CancelablePromise as CancelablePromise,
    index_CancelError as CancelError,
    index_OpenAPI as OpenAPI,
    index_OpenAPIConfig as OpenAPIConfig,
    index_AccessTokensService as AccessTokensService,
    index_OrganizationsService as OrganizationsService,
    index_PostsService as PostsService,
  };
}

export { IManuscriptStudioProps, ISchema, index as ManuscriptApi, ManuscriptStudio };
