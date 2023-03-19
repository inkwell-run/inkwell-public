/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrganizationsService {

    /**
     * This endpoint returns information about an organization if it exists. If your access token does not have sufficient priviliges, you will receive a FORBIDDEN reponse.
     * @param id
     * @returns any Successful response
     * @throws ApiError
     */
    public static queryOrganizationsFindUnique(
        id: string,
    ): CancelablePromise<{
        id: string;
        createdAt: string;
        clerkOrganizationId: string;
        clerkOrganizationName?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organizations/findUnique',
            query: {
                'id': id,
            },
        });
    }

}
