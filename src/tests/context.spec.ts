import type {APIRequestContext} from "playwright-core";
import {test} from './fixture';

let apiContext: APIRequestContext;

test.beforeAll(async ({playwright}) => {
    apiContext = await playwright.request.newContext({
        baseURL: 'https://demo.printbase.co'
    });
})

test('context', async ({api}) => {
    await api.run({context: apiContext});
})
