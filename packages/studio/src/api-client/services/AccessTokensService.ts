/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccessTokensService {

    /**
     * Add your access token as an Authorization Bearer token. This endpoint returns information about the token, including the organization that it provides read/write privileges for.
     * @returns any Successful response
     * @throws ApiError
     */
    public static queryAccessTokensTest(): CancelablePromise<{
        id: string;
        createdAt: string;
        organizationId: number | null;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/access-tokens/test',
        });
    }

}
