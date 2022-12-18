import { AsyncLocalStorage } from 'async_hooks';
import { Request, Response } from 'express';

export class RequestContext {
  static cls = new AsyncLocalStorage<RequestContext>();

  static get currentContext() {
    return this.cls.getStore();
  }

  static get currentReq() {
    return this.cls.getStore().req;
  }

  static get currentHeaders() {
    return this.cls.getStore().req.headers;
  }

  static get currentCookies() {
    return this.cls.getStore().req.cookies;
  }

  constructor(public readonly req: Request, public readonly res: Response) {}
}
