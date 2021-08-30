import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthGuard } from './auth/auth.guard';
import { FrontendMiddleware } from './middlewares/frontend.middleware';
import { DatabaseModule } from './database/database.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './modules/auth/auth.module';
import { ClassroomModule } from './modules/clasroom/classroom.module';
import { DiscosModule } from './modules/disk/discos.module';
import { ArduinoModule } from './modules/arduino/arduino.module';
import { OrdenadoresModule } from './modules/computer/ordenadores.module';
import { ProfesoresModule } from './modules/teacher/profesores.module';
import { CompressionMiddleware } from '@aml360/nestjs-compression';

@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		// RoleModule,
		ServeStaticModule.forRoot({
			rootPath: join('/app', '/ngDist'),
			exclude: ['/nest*'],
		}),
		ClassroomModule,
		DiscosModule,
		ArduinoModule,
		OrdenadoresModule,
		ProfesoresModule,
	],
	controllers: [],
	providers: [AuthGuard, ConfigService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		//Modulo que comprime las request con gzip
		CompressionMiddleware.configure({ level: 8 });
		consumer.apply(FrontendMiddleware, CompressionMiddleware).forRoutes({ path: '**', method: RequestMethod.ALL });
	}
}
