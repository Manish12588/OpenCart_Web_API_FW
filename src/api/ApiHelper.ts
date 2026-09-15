import { APIRequestContext } from "@playwright/test";

export class ApiHelper {
  private readonly request: APIRequestContext;
  private readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  //Helper Methods:
  //GET with Headers
  async get(endPoint: string, headers?: Record<string, string>) {
    let response = await this.request.get(`${this.baseURL}${endPoint}`, {
      headers: headers,
    });

    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  //POST
  async post(endPoint: string, data: object, headers?: Record<string, string>) {
    let response = await this.request.post(`${this.baseURL}${endPoint}`, {
      headers: headers,
      data: data,
    });

    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  //PUT
  async put(endPoint: string, data: object, headers?: Record<string, string>) {
    let response = await this.request.put(`${this.baseURL}${endPoint}`, {
      headers: headers,
      data: data,
    });

    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  //PUT
  async patch(
    endPoint: string,
    data: object,
    headers?: Record<string, string>,
  ) {
    let response = await this.request.patch(`${this.baseURL}${endPoint}`, {
      headers: headers,
      data: data,
    });

    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  //DELETE
  async delete(endPoint: string, headers?: Record<string, string>) {
    let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
      headers: headers,
    });

    return {
      status: response.status(),
    };
  }
}
