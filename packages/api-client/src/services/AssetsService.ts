/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AssetsService {

    /**
     * @param postId
     * @returns any Successful response
     * @throws ApiError
     */
    public static queryAssetsFindMany(
        postId?: number,
    ): CancelablePromise<Array<{
        id: number;
        createdAt: string;
        type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'OTHER';
        name?: string;
        providerType: 'CLOUDFLARE' | 'UPLOADCARE' | 'OTHER';
        providerId: string;
        providerIsUploaded: boolean;
        _providerSignedUploadUrl?: string;
        /**
         * The posts that are linked to this asset (but don't necessarilly use it in their content)
         */
        linkedPostIds?: Array<number>;
        /**
         * The posts that use this asset in their content
         */
        usedInPostIds?: Array<number>;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/assets/findMany',
            query: {
                'postId': postId,
            },
        });
    }

    /**
     * @param id
     * @returns any Successful response
     * @throws ApiError
     */
    public static queryAssetsFindUnique(
        id: number,
    ): CancelablePromise<{
        id: number;
        createdAt: string;
        type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'OTHER';
        name?: string;
        providerType: 'CLOUDFLARE' | 'UPLOADCARE' | 'OTHER';
        providerId: string;
        providerIsUploaded: boolean;
        _providerSignedUploadUrl?: string;
        /**
         * The posts that are linked to this asset (but don't necessarilly use it in their content)
         */
        linkedPostIds?: Array<number>;
        /**
         * The posts that use this asset in their content
         */
        usedInPostIds?: Array<number>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/assets/findUnique',
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
    public static mutationAssetsCreate(
        requestBody: {
            postId: number;
            providerId: string;
            providerType?: 'CLOUDFLARE' | 'UPLOADCARE' | 'OTHER';
            name?: string;
        },
    ): CancelablePromise<{
        id: number;
        createdAt: string;
        type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'OTHER';
        name?: string;
        providerType: 'CLOUDFLARE' | 'UPLOADCARE' | 'OTHER';
        providerId: string;
        providerIsUploaded: boolean;
        _providerSignedUploadUrl?: string;
        /**
         * The posts that are linked to this asset (but don't necessarilly use it in their content)
         */
        linkedPostIds?: Array<number>;
        /**
         * The posts that use this asset in their content
         */
        usedInPostIds?: Array<number>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/assets/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns any Successful response
     * @throws ApiError
     */
    public static mutationAssetsDelete(
        requestBody: {
            assetId: number;
        },
    ): CancelablePromise<{
        id: number;
        createdAt: string;
        type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'OTHER';
        name?: string;
        providerType: 'CLOUDFLARE' | 'UPLOADCARE' | 'OTHER';
        providerId: string;
        providerIsUploaded: boolean;
        _providerSignedUploadUrl?: string;
        /**
         * The posts that are linked to this asset (but don't necessarilly use it in their content)
         */
        linkedPostIds?: Array<number>;
        /**
         * The posts that use this asset in their content
         */
        usedInPostIds?: Array<number>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/assets/delete',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
