import { SHA256_PREFIX, SHA256_SUFFIX } from './sha256.constants';
import { Global, Inject, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Global()
@Injectable()
export class Sha256Service {
  constructor(@Inject(SHA256_PREFIX) private readonly partOne, @Inject(SHA256_SUFFIX) private readonly partTwo) {}

  strToSha256(str: string, digest: 'hex' | 'base64' = 'base64') {
    return createHash('sha256').update(this.getCleanedStr(str)).digest(digest);
  }

  validateSha256(strHashValue: string, strSha256: string) {
    const hash = this.strToSha256(strHashValue);
    return Boolean(hash === strSha256);
  }

  private getCleanedStr(str: string) {
    return this.partOne + str + this.partTwo;
  }
}
