import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as opencage from 'opencage-api-client';

export interface BuscarCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface BuscarGeolocalizacaoResponse {
  results: Array<{
    geometry: {
      lat: number;
      lng: number;
    };
  }>;
}

export class LocationUtil {
  private static configService = new ConfigService();

  static async buscarCep(cep: string): Promise<BuscarCepResponse> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar o CEP: ${error}`);
    }
  }

  static async buscarGeolocalizacao(
    cepUnformated: string,
  ): Promise<BuscarGeolocalizacaoResponse> {
    const cep = cepUnformated.replace(/\D/g, '');
    const cepData = await this.buscarCep(cep);
    const query = `${cepData.logradouro} ${cepData.bairro} ${cepData.localidade} ${cepData.uf}`;

    try {
      const result = await opencage.geocode({
        q: query,
        key: this.configService.get('OPENCAGE_API_KEY'),
      });
      return result;
    } catch (error) {
      throw new Error(`Erro ao buscar geolocalização: ${error}`);
    }
  }
}
