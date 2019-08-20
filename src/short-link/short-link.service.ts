import {Injectable} from '@nestjs/common';
import {RedisService} from 'nestjs-redis';
import * as Redis from "ioredis";
import * as crypto from "crypto";

@Injectable()
export class ShortLinkService {
  private readonly _client: Redis.Redis;

  constructor(
    private readonly redisService: RedisService,
  ) {
    this._client = this.redisService.getClient();
  }

  public async getOriginalLink(link: string): Promise<string> {
    return await this._client.get(link);
  }

  public async generateShortLink(link: string): Promise<string> {
    const rand = crypto.randomBytes(20).toString('hex');
    const checkedLink = /\bhttp(s)?:\/\//.test(link) ? link : `https://${link}`;

    await this._client.set(
      rand,
      checkedLink
    );

    return rand;
  }
}
