# NestJS Useful Toolkit

> Useful tools for the NestJs framework. The tools are listed below:‌
>
> > **`Crypto`**, **`Decorators`**, **`Error Methods`**, **`Filters`**, **`Interceptors`**, **`Middlewares`**, **`Providers`**, **`Sha256`**, **`Swagger`**, **`Helpers`**, ...

<hr />

## Installation

```bash
# npm
$ npm install --save nest-toolkit

# yarn
$ yarn add nest-toolkit
```

<hr />

> ### **Crypto module**
>
> This module is used to encrypt and decrypt strings. For this purpose, a hash is taken as a secret key.

```typescript
// app.module.ts
import { CryptoModule } from 'nest-toolkit';

@Module({
  imports: [
    CryptoModule.register({
      secret: 'your secret key',
    }),
  ],
})
export class AppModule {}
```

```typescript
// your.service.ts
import { CryptoService, TextEncrypt } from 'nest-toolkit';

export class YourService {
  constructor(private readonly crypto: CryptoService) {}

  testCrypto() {
    const encryptValue: TextEncrypt = this.crypto.encrypt('Nestjs');
    // console.log(encryptValue) -> { iv: 'hash', content: 'hash' }

    const text: string = this.crypto.decrypt(encryptValue);
    // console.log(text) -> Nestjs
  }
}
```

<hr />

> ### **Sha256 module**
>
> This module is used to hash strings. It receives a secret key, which must be in the format "prefix_key.suffix_key". Pay attention to the dot in the middle of the format. Or you can inject the prefix and suffix without referencing the secret to the module.

```typescript
// app.module.ts
import { Sha256Module } from 'nest-toolkit';

@Module({
  imports: [
    Sha256Module.register({
      secret: 'prefix_key.suffix_key',
      // or
      prefix: 'your prefix key',
      suffix: 'your suffix key',
    }),
  ],
})
export class AppModule {}
```

```typescript
// your.service.ts
import { Sha256Service } from 'nest-toolkit';

export class YourService {
  constructor(private readonly sha256: Sha256Service) {}

  testSha256() {
    const hash = this.sha256.strToSha256('Nestjs');
    // console.log(hash) -> 9Zzgx2HPoCk0yAlp8qB1jSOpmm/6khXYJnSyfYIakxU=

    const isValidHash = this.sha256.validateSha256('Nestjs', hash);
    // console.log(isValidHash) -> true
  }
}
```

<hr />

> ### **Swagger Starter**
>
> > This tools has custom styles

```typescript
// main.ts
import { SwaggerStarter } from 'nest-toolkit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerStarter(app, 'docs');

  await app.listen(3000);
}

bootstrap();
```

## Author

**Mostafa Gholami ([Github Page](https://mst-ghi.github.io/))**
