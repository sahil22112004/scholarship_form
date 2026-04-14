import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateAddressDetailService } from './create-address-detail.service';


@Controller('applications')
export class CreateAddressDetailController {
    constructor(private readonly CreateAddressDetailService: CreateAddressDetailService) { }

    @Post(':applicationId/address-details')
    async createAddressDetail(@Param('applicationId') applicationId: string, @Body() content: any) {
        const response = await this.CreateAddressDetailService.createAddressDetail(+applicationId, content);
        return response
    }
}