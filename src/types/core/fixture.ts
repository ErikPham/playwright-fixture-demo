import type {ReadStream} from "fs";
import type {APIRequestContext} from "@playwright/test";
import type {APIResponse} from "playwright-core";
import type {Serializable} from "playwright-core/types/structs";

export type FixtureApiRequestOptions = {
    url: string;
    data?: string | Buffer | Serializable;
    failOnStatusCode?: boolean;
    form?: { [key: string]: string | number | boolean; };
    headers?: { [key: string]: string; };
    ignoreHTTPSErrors?: boolean;
    method?: string;
    multipart?: {
        [key: string]: string | number | boolean | ReadStream | {
            name: string;
            mimeType: string;
            buffer: Buffer;
        };
    };
    params?: { [key: string]: string | number | boolean; };
    timeout?: number;
}

export type FixtureApiRequestHook = (options: FixtureApiRequestOptions) => FixtureApiRequestOptions

export type FixtureApiResponseHook = (response: APIResponse) => APIResponse

export type FixtureApiOptions = {
    context?: APIRequestContext;
    hooks?: {
        request: Array<FixtureApiRequestHook>
        response: Array<FixtureApiResponseHook>
    }
}

export type FixtureApi = {
    run: (options?: FixtureApiOptions) => Promise<boolean>;
}

export type TestApiCase = {
    endpoint: string;
    body?: string;
    method?: string;
    data?: any;
    headers?: any;
    response: any;
    type?: "json" | "text";
}
