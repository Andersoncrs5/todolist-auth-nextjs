export interface ResponseHTTP<T> {
    url: string
    message: string
    statusCode: 0
    body: T
    success: true
    links: string[]
    timestamp: Date
}