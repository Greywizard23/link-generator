import {Controller, Get, Param, Put, Res} from '@nestjs/common';
import {ShortLinkService} from "./short-link.service";

@Controller()
export class ShortLinkController {
  constructor(private readonly shortLinkService: ShortLinkService) {}

  @Put(':link')
  async store(@Param('link') link): Promise<string> {
    return await this.shortLinkService.generateShortLink(link);
  }

  @Get(':link')
  async show(@Param('link') link, @Res() res): Promise<void> {
    res.redirect(301,
      await this.shortLinkService.getOriginalLink(link)
    );
  }
}
