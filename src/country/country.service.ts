import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CountryService {
  private readonly dateNagerApiUrl: string;
  private readonly countriesNowApiUrl: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.dateNagerApiUrl = this.configService.get<string>(
      'DATE_NAGER_API_BASE_URL',
    );
    this.countriesNowApiUrl = this.configService.get<string>(
      'COUNTRIES_NOW_API_BASE_URL',
    );
  }
  async getAvailableCountries() {
    const { data } = await firstValueFrom(
      this.httpService.get<string>(
        `${this.dateNagerApiUrl}/AvailableCountries`,
      ),
    );
    return data;
  }
}
