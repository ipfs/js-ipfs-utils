
export interface HttpResponse extends Response {
    iterator: () => AsyncIterator<Uint8Array>; 
    ndjson: AsyncGeneratorFunction
}