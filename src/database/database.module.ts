import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,


    })
    , MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("MONGO_URI"),
        user: "root",
        pass: "root",
        dbName: "chatapp"
      }),
      inject: [ConfigService]
    })]
})
export class DatabaseModule {
  static forFeatures(models: ModelDefinition[]): DynamicModule {
    return MongooseModule.forFeature(models)

  }

}
