/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EnvironmentService {

    /**
     * The endpoint returns environment setup config for the studio.
     * @returns any Successful response
     * @throws ApiError
     */
    public static queryEnvironmentTest(): CancelablePromise<{
        userAuthPublicKey?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/environment/test',
        });
    }

}
