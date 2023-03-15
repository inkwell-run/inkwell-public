/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostsService {

    /**
     * @returns any Successful response
     * @throws ApiError
     */
    public static queryPostsFindMany(): CancelablePromise<Array<{
        id: number;
        slug: string;
        createdAt: string;
        updatedAt: string;
        content?: string;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/posts/findMany',
        });
    }

    /**
     * @param id
     * @returns any Successful response
     * @throws ApiError
     */
    public static queryPostsFindUnique(
        id: number,
    ): CancelablePromise<{
        id: number;
        slug: string;
        createdAt: string;
        updatedAt: string;
        content?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/posts/findUnique',
            query: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody
     * @returns any Successful response
     * @throws ApiError
     */
    public static mutationPostsUpdate(
        requestBody: {
            id: number;
            slug?: string;
            content?: string;
            schema?: string;
        },
    ): CancelablePromise<{
        id: number;
        slug: string;
        createdAt: string;
        updatedAt: string;
        content?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/posts/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns any Successful response
     * @throws ApiError
     */
    public static mutationPostsCreate(
        requestBody: {
            slug?: string;
            content?: string;
        },
    ): CancelablePromise<{
        id: number;
        slug: string;
        createdAt: string;
        updatedAt: string;
        content?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/posts/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns any Successful response
     * @throws ApiError
     */
    public static mutationPostsDelete(
        id: number,
    ): CancelablePromise<{
        id: number;
        slug: string;
        createdAt: string;
        updatedAt: string;
        content?: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/posts/delete',
            query: {
                'id': id,
            },
        });
    }

}
