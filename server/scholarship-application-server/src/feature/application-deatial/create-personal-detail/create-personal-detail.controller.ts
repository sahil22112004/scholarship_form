import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreatePersonalDetailService } from './create-personal-detail.service';


@Controller('applications')
export class CreatePersonalDetailController {
    constructor(private readonly CreatePersonalDetailService: CreatePersonalDetailService) { }

    @Post(':applicationId/personal-details')
    async createPersonalDetail(@Param('applicationId') applicationId: string, @Body() content: any) {
        const response = await this.CreatePersonalDetailService.createPersonalDetail(+applicationId, content);
        return response
    }
}