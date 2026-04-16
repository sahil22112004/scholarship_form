import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateAdditionalInformationService } from './create-additional-information.service';


@Controller('applications')
export class CreateAdditionalInformationController {
    constructor(private readonly CreateAdditionalInformationService: CreateAdditionalInformationService) { }

    @Post(':applicationId/additional-information')
    async createAdditionalInformation(@Param('applicationId') applicationId: string, @Body() content: any) {
        const response = await this.CreateAdditionalInformationService.createAdditionalInformation(+applicationId, content);
        return response
    }
}