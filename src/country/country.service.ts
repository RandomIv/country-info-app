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
  async getCountryInfo(countryCode: string) {
    const countryResponse = await firstValueFrom(
      this.httpService.get(
        `${this.dateNagerApiUrl}/CountryInfo/${countryCode}`,
      ),
    );
    const countryInfo = countryResponse.data;
    const countryName = countryInfo.commonName;

    const { data } = await firstValueFrom(
      this.httpService.post(`${this.countriesNowApiUrl}/countries/population`, {
        country: countryName,
      }),
    );
    const populationData = data.data;

    const flagResponse = await firstValueFrom(
      this.httpService.post(
        `${this.countriesNowApiUrl}/countries/flag/images`,
        { country: countryName },
      ),
    );
    const flagData = flagResponse.data.data;

    return {
      borders: countryInfo.borders.map((border) => ({
        countryCode: border.countryCode,
        name: border.commonName,
      })),
      population: populationData.populationCounts,
      flagUrl: flagData.flag,
    };
  }
}
