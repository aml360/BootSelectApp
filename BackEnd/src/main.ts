import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Configuration as cnf } from './config/config.keys';
import { ConfigService } from './config/config.service';
import { parseStrToBoolean } from 'sharedCode/index';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { fromUnixTime, differenceInSeconds } from 'date-fns';

const cnfService = new ConfigService();
const http = new HttpService();

async function isSvDateCorrect(httpSv: HttpService): Promise<boolean> {
	try {
		const httpJsonResponse = await firstValueFrom(httpSv.get<{ unixtime: string }>('http://worldtimeapi.org/api/ip'));
		const dateActual = new Date();
		const dateHttp = fromUnixTime(Number.parseInt(httpJsonResponse.data.unixtime));
		const dateDiff = differenceInSeconds(dateActual, dateHttp);
		if (dateDiff > 30 || dateDiff < -30) {
			console.error(
				`\x1b[31mLa fecha del servidor difiere con la de la api en ${dateDiff} segundos [negativo es atrasado el sv]`,
			);
			return false;
		} else {
			return true;
		}
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function bootstrap() {
	// Check production server date
	if (process.env.NODE_ENV === 'production') {
		await isSvDateCorrect(http);
	}

	const isCorsEnabled = process.env.NODE_ENV !== 'production' ? true : false;
	const app = await NestFactory.create(AppModule, { cors: isCorsEnabled });

	if (parseStrToBoolean(cnfService.get(cnf.SWAGGER))) {
		const options = new DocumentBuilder()
			.setTitle('BootSelect')
			.setDescription('Backend bootselect')
			.setVersion('1.0')
			.build();
		const document = SwaggerModule.createDocument(app, options);
		SwaggerModule.setup('api', app, document);
	}

	await app.listen(cnfService.get(cnf.APP_PORT));
}
bootstrap();
