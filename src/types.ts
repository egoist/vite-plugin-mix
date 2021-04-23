import { ServerResponse, IncomingMessage } from 'http'

export interface Request extends IncomingMessage {
  /**
   * The originally-requested URL, including parent router segments.
   */
  originalUrl: string

  /**
   * The path portion of the requested URL.
   */
  path: string

  /**
   * The values of named parameters within your route pattern
   */
  params: {
    [key: string]: string
  }

  /**
   * The un-parsed querystring
   */
  search: string | null

  /**
   * The parsed querystring
   */
  query: {
    [key: string]: string | string[]
  }
}

export type Response = ServerResponse
export type NextFunction = (err?: Error) => void

export type Handler = (req: Request, res: Response, next: NextFunction) => any
