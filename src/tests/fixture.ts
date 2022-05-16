import {test as base, expect} from '@playwright/test';
import type {TestApiCase, FixtureApi, FixtureApiOptions} from "@types";

export const test = base.extend<{ api: FixtureApi }>({
    api: [
        async ({page, request}, use, testInfo) => {
            await use({
                async run(options?: FixtureApiOptions): Promise<boolean> {
                    const data = require(`./${testInfo.title}.json`);
                    const testApiData = data.api.DEMO_01;
                    const promises: Array<Promise<any>> = [];
                    Object.keys(testApiData).forEach((status) => {
                        testApiData[status].forEach((testApiCase: TestApiCase) => {
                            promises.push(new Promise(async (resolve, reject) => {
                                try {
                                    const response = await (options?.context || request).fetch(testApiCase.endpoint, {
                                        method: testApiCase.method || 'GET',
                                        data: testApiCase.data,
                                        headers: testApiCase.headers,
                                    });
                                    if (response.status().toString() !== status) {
                                        reject('Response error')
                                        return
                                    }

                                    expect(await response.json()).toMatchObject(testApiCase.response)
                                    resolve(true)
                                } catch (e) {
                                    console.log('Request error', e)
                                    reject('Request error')
                                }
                            }))
                        })
                    });

                    try {
                        await Promise.all(promises);
                        return Promise.resolve(true);
                    } catch (e) {
                        return Promise.reject(false);
                    }
                }
            })
        },
        {scope: "test"},
    ]
});

export {expect} from '@playwright/test';