import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly axiosInstance: AxiosInstance;
  private baseUrl = 'http://localhost:3000';

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
    console.log(this.axiosInstance.defaults);
  }

  /*
    Método genérico para manejar peticiones POST
  */
  private async postRequest(endpoint: string, data: any): Promise<any[]> {
    try {
      const response = await this.axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error al hacer POST a ${endpoint}:`, error);
      throw error;
    }
  }

  /*--------------USUARIOS---------------- */
  /*
    Obtener todos los usuarios desde el backend
   */
  async getUsuarios(usuario: any): Promise<any[]> {
    return this.postRequest('/usuario', usuario);
  }

  async getUsuariosPendientes(): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/usuario/usuarios-pendiente');
      console.log('Respuesta completa del servidor:', response.data);

      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data; // Devuelve el array de eventos en la propiedad 'data'
      } else {
        console.warn('La respuesta no contiene un array de usuarios pendientes');
        return [];
      }
    } catch (error) {
      console.error('Error al obtener usuarios pendites:', error);
      throw error;
    }
  }

  /*---------------EVENTOS---------------- */
  /*
    Obtener todos los eventos desde el backend
   */
  async getEventosusuarionormal(): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/evento/eventos-Usernormal');
      console.log('Respuesta completa del servidor:', response.data);

      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data; // Devuelve el array de eventos en la propiedad 'data'
      } else {
        console.warn('La respuesta no contiene un array de eventos');
        return [];
      }
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }

  async getEventoscreador(usuario: string): Promise<any[]> {
    try {
      // Realiza la solicitud POST al backend
      const response = await this.axiosInstance.post('/evento/eventos-Creador', {
        NombreCreador: usuario, // El parámetro se pasa en el cuerpo, como en el @Body() del backend
      });

      console.log('Respuesta completa del servidor:', response.data);

      // Verificar que la respuesta contiene los datos esperados
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data; // Devuelve los eventos
      } else {
        console.warn('La respuesta no contiene un array de eventos');
        return [];
      }
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }
  async getEventosadmin(): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/evento/eventos-Admin');
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }

  async getEvento(evento: number): Promise<any[]> {
    try {
      // El parámetro "evento" se pasa directamente en la URL como parte del endpoint
      const response = await this.axiosInstance.get(`/evento/id-evento/${evento}`);
      console.log('Respuesta completa del servidor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener evento:', error);
      throw error;
    }
  }

  async getEventosfecha(): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/evento/filtrar-fecha');
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }

  async getEventospendientes(): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/evento/eventos-pend');
      console.log('Respuesta completa del servidor:', response.data);

      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data; // Devuelve el array de eventos en la propiedad 'data'
      } else {
        console.warn('La respuesta no contiene un array de eventos');
        return [];
      }
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }


  /*---------------ESPACIOS---------------- */
    /*
      Obtener todos los espacios desde el backend
     */
      async getEspacios(espacio: any): Promise<any[]> {
        return this.postRequest('/espacio', espacio);
      }

      async getEspacioEvento(nomEvento: string): Promise<any[]> {
        try {
          const response = await this.axiosInstance.post('/evento/espacio-evento', { nomEvento });
          if (response.data && Array.isArray(response.data.data)) {
            return response.data.data;
          } else {
            console.warn('Respuesta no contiene eventos.');
            return [];
          }
        } catch (error) {
          console.error('Error en getEspacioEvento:', error);
          throw error;
        }
      }
      
  /*---------------PETICIONES---------------- */
  /* 
    Obtener todos los peticiones desde el backend
  */
  async getPeticiones(peticiones: any): Promise<any[]> {
    return this.postRequest('/peticiones', peticiones);
  }
}
