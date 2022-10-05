import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { CustomCss } from './swagger.css';

export enum SwaggerRunStatusEnum {
  On = 'on',
  Off = 'off',
}

export class SwaggerStarter {
  static start(
    app: any,
    path: string = 'docs',
    servicePath: string = 'backend',
    baseUrl?: string,
    options?: SwaggerDocumentOptions,
  ) {
    if (process.env.SWAGGER_RUN_STATUS === SwaggerRunStatusEnum.On) {
      const title = servicePath
        .split('-')
        .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
        .join(' ');

      const config = new DocumentBuilder();

      if (baseUrl && servicePath) {
        config
          .setDescription(`BaseURL: <strong>${baseUrl}/${servicePath}</strong>`)
          .addServer(baseUrl + '/' + servicePath);
      }

      config.setTitle(`${title} APIs`).setVersion('1.0').addBearerAuth();

      const document = SwaggerModule.createDocument(app, config.build(), options);

      let customCss;

      try {
        customCss = readFileSync('swagger.css', 'utf8');
      } catch (error) {
        customCss = CustomCss;
      }

      SwaggerModule.setup(path, app, document, {
        customCss,
        swaggerOptions: {
          docExpansion: 'none',
          layout: 'StandaloneLayout',
        },
      });
    }
  }
}
