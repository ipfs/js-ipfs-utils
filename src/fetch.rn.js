// @ts-ignore
import { Headers, Request, Response, fetch } from 'react-native-fetch-api'

/** @type {import('electron-fetch').default} */
const rnFetch = fetch
/** @type {import('electron-fetch').Headers} */
const rnHeaders = Headers
/** @type {import('electron-fetch').Request} */
const rnRequest = Request
/** @type {import('electron-fetch').Response} */
const rnResponse = Response
export default rnFetch
export { rnHeaders as Headers, rnRequest as Request, rnResponse as Response }
