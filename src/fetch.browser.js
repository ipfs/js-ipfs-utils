const { fetch, Request, Response, Headers } = globalThis

// use window.fetch if it is available, fall back to node-fetch if not
export default fetch
export { Request, Response, Headers }
