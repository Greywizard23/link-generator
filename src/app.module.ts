import {Module} from '@nestjs/common';
import {ShortLinkController} from './short-link/short-link.controller';
import {ShortLinkService} from './short-link/short-link.service';
import {RedisModule} from 'nestjs-redis'


@Module({
	imports: [
		RedisModule.register({
			url: 'redis://:@127.0.0.1:6379',
		})
	],
	controllers: [ShortLinkController],
	providers: [ShortLinkService],
})
export class AppModule { }
