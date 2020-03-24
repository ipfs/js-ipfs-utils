export = HTTP;
/**
 * @typedef {Object} APIOptions - creates a new type named 'SpecialType'
 * @prop {any} [body] - Request body
 * @prop {string} [method] - GET, POST, PUT, DELETE, etc.
 * @prop {string} [base] - The base URL to use in case url is a relative URL
 * @prop {Headers|Record<string, string>} [headers] - Request header.
 * @prop {number} [timeout] - Amount of time until request should timeout in ms.
 * @prop {AbortSignal} [signal] - Signal to abort the request.
 * @prop {URLSearchParams|Object} [searchParams] - URL search param.
 * @prop {string} [credentials]
 * @prop {boolean} [throwHttpErrors]
 * @prop {function(URLSearchParams): URLSearchParams } [transformSearchParams]
 * @prop {function(any): any} [transform] - When iterating the response body, transform each chunk with this function.
 * @prop {function(Response): Promise<void>} [handleError] - Handle errors
 */
declare class HTTP {
    /**
     *
     * @param {APIOptions} options
     */
    constructor(options?: APIOptions);
    /** @type {APIOptions} */
    opts: APIOptions;
    abortController: any;
    /**
     * Fetch
     *
     * @param {string | URL | Request} resource
     * @param {APIOptions} options
     * @returns {Promise<Response>}
     */
    fetch(resource: string | Request | URL, options?: APIOptions): Promise<Response>;
    /**
     * @param {string | URL | Request} resource
     * @param {APIOptions} options
     * @returns {Promise<Response>}
     */
    post(resource: string | Request | URL, options?: APIOptions): Promise<Response>;
    /**
     * @param {string | URL | Request} resource
     * @param {APIOptions} options
     * @returns {Promise<Response>}
     */
    get(resource: string | Request | URL, options?: APIOptions): Promise<Response>;
    /**
     * @param {string | URL | Request} resource
     * @param {APIOptions} options
     * @returns {Promise<Response>}
     */
    put(resource: string | Request | URL, options?: APIOptions): Promise<Response>;
    /**
     * @param {string | URL | Request} resource
     * @param {APIOptions} options
     * @returns {Promise<Response>}
     */
    delete(resource: string | Request | URL, options?: APIOptions): Promise<Response>;
    /**
     * @param {string | URL | Request} resource
     * @param {APIOptions} options
     * @returns {Promise<Response>}
     */
    options(resource: string | Request | URL, options?: APIOptions): Promise<Response>;
    /**
     * @param {string | URL | Request} resource
     * @param {APIOptions} options
     * @returns {Promise<ReadableStream<Uint8Array>>}
     */
    stream(resource: string | Request | URL, options?: APIOptions): Promise<ReadableStream<Uint8Array>>;
    /**
     * @param {string | URL | Request} resource
     * @param {APIOptions} options
     * @returns {AsyncGenerator<Uint8Array, void, any>}
     */
    iterator(resource: string | Request | URL, options?: APIOptions): AsyncGenerator<Uint8Array, void, any>;
    /**
     * @param {string | URL | Request} resource
     * @param {APIOptions} options
     * @returns {AsyncGenerator<Object, void, any>}
     */
    ndjson(resource: string | Request | URL, options?: APIOptions): AsyncGenerator<any, void, any>;
}
declare namespace HTTP {
    export { HTTPError, TimeoutError, ndjson, streamToAsyncIterator, post, get, put, _delete as delete, options, APIOptions };
}
/**
 * - creates a new type named 'SpecialType'
 */
type APIOptions = {
    /**
     * - Request body
     */
    body?: any;
    /**
     * - GET, POST, PUT, DELETE, etc.
     */
    method?: string;
    /**
     * - The base URL to use in case url is a relative URL
     */
    base?: string;
    /**
     * - Request header.
     */
    headers?: Record<string, string> | Headers;
    /**
     * - Amount of time until request should timeout in ms.
     */
    timeout?: number;
    /**
     * - Signal to abort the request.
     */
    signal?: AbortSignal;
    /**
     * - URL search param.
     */
    searchParams?: any;
    credentials?: string;
    throwHttpErrors?: boolean;
    transformSearchParams?: (arg0: URLSearchParams) => URLSearchParams;
    /**
     * - When iterating the response body, transform each chunk with this function.
     */
    transform?: (arg0: any) => any;
    /**
     * - Handle errors
     */
    handleError?: (arg0: Response) => Promise<void>;
};
declare class HTTPError extends Error {
    constructor(response: any);
    response: any;
}
declare class TimeoutError extends Error {
}
declare function ndjson(source: AsyncGenerator<Uint8Array, void, any>): AsyncGenerator<any, void, any>;
declare function streamToAsyncIterator(source: any): any;
declare function post(resource: string | Request | URL, options: APIOptions): Promise<Response>;
declare function get(resource: string | Request | URL, options: APIOptions): Promise<Response>;
declare function put(resource: string | Request | URL, options: APIOptions): Promise<Response>;
declare function options(resource: string | Request | URL, options: APIOptions): Promise<Response>;
