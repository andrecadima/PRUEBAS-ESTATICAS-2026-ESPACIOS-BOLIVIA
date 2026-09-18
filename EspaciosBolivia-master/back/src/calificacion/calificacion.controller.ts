import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post, RequestTimeoutException } from '@nestjs/common';
import { CalificacionService } from './calificacion.service';
import { CalificacionDto } from './dto/calificacion.dto';
import { CalificacionDto1 } from './dto/calificacion.dto1';
import { EventoEntity } from 'src/evento/evento.entity';
import { DataSource } from 'typeorm';
import { TimeoutError } from 'rxjs';

@Controller('calificacion')
export class CalificacionController 
{
   
   private readonly eventoRepository;
   constructor(private readonly calificacionservice: CalificacionService,private readonly dataSource: DataSource)
   {
      
      this.eventoRepository=this.dataSource.getRepository(EventoEntity);
   }

   @Post()
   async create(@Body() dto1:CalificacionDto1)
   {
      try{
         const evento = await this.eventoRepository.findOneBy({nombre:dto1.id_evento});
         if(!evento)
         {
            throw new BadRequestException(`El evento no existe`);
         }
         const dto: CalificacionDto=
         {
            id_evento: evento.id,
            calificacion: dto1.calificacion,
            comentario: dto1.comentario
         };
         return await  this.calificacionservice.create(dto);
      } catch (error) 
      {
         if (error instanceof TimeoutError) 
         {  // Verifica si el error es por tiempo de espera
            throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
         }
         // Si es otro tipo de error, lanzamos un error interno
         console.error('Error en create:', error); // Esto te dará más información
           throw error; 
      }
   }

   @Get('todas-calificaciones')
   async todascalif()
   {
      try
      {
         return await this.calificacionservice.califs();
      } catch (error) 
      {
         if (error instanceof TimeoutError) 
         {  // Verifica si el error es por tiempo de espera
            throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
         }
         // Si es otro tipo de error, lanzamos un error interno
         throw new InternalServerErrorException('Hubo un problema al crear el espacio. Intenta más tarde.');
      }
   }

   @Get('calificaciones-evento')
   async califsevento(@Body() body: {nomevento:string})
   {
      try
      {
         const {nomevento} = body;
         return await this.calificacionservice.califsevento(nomevento);
      } catch (error) 
      {
         if (error instanceof TimeoutError) 
         {  // Verifica si el error es por tiempo de espera
            throw new RequestTimeoutException('La conexión con la base de datos está tardando demasiado. Intenta más tarde.');
         }
         // Si es otro tipo de error, lanzamos un error interno
         throw new InternalServerErrorException('Hubo un problema al crear el espacio. Intenta más tarde.');
      }
   }

      @Get('calificaciones-desc')
      async calificacionesDesc() {
         return await this.calificacionservice.calificacionesOrdenadasDesc();
      }
      @Get('promedio-evento')
      async promedioEvento(@Body() body:{nomevento:string})
      {
         const {nomevento}=body;
         return await this.calificacionservice.promedioCalificacionesEvento(nomevento);
      }
      @Get('promedios-eventos')
      async promediosEventos()
      {
         return await this.calificacionservice.listaPromedioEventos();
      }
      @Get('total-calificaciones-evento')
      async totalCalificaciones(@Body() body:{nomevento:string})
      {
         const {nomevento}=body;
         return await this.calificacionservice.totalCalificacionesEvento(nomevento);
      }
      @Get('top-eventos')
      async topEventis(@Body()body:{cantidad:number})
      {
         const{cantidad}=body;
         return await this.calificacionservice.topEventos(cantidad);
      }

}
