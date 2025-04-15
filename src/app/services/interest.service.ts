import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterestRequest } from '../types/interest-request.type';
import { InterestResponse } from '../types/interest-response.type';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  constructor(
    private httpCliente: HttpClient
  ) { }

  calculator(request: InterestRequest){
    return this.httpCliente.post<InterestResponse>("http://localhost:8080/interest/", request).pipe();
  }
}
