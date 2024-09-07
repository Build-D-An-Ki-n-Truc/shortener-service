import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';

@Injectable()
export class ShortenerService {
    private readonly localhost = process.env.LOCALHOST
    private readonly tinyurlApiKey = process.env.TINYURL_API_KEY;

    constructor() {}

    private getAuthHeaders(token: string) {
      return {
        Authorization: `Bearer ${this.tinyurlApiKey}`,
        'Content-Type': 'application/json'
      };
    }
    
    async shortenShareFeature(username: string, turn: number) {
      try {
        const config: AxiosRequestConfig = {
          headers: {
            'Accept': '*/*',
          } as RawAxiosRequestHeaders,
        };
        
        console.log(turn)
        const data = {
          'data': {
            'username': username,
            'name': '',
            'email': '',
            'role': '',
            'phone': '',
            'isLocked': false,
            'turn': turn + 1
          }
        };
    
        const client = axios.create({
          baseURL: "http://" + this.localhost + ":3000",
        });
    
        let fetchResult: AxiosResponse = await client.put("/users/update", data, config);
      } catch (error) {
        console.log(error)
      }
    }
}
