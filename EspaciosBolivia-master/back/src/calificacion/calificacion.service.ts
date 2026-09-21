import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CalificacionEntity } from './calificacion.entity';
import { CalificacionDto } from './dto/calificacion.dto';
import { DataSource } from 'typeorm';
import { EventoEntity } from 'src/evento/evento.entity';
@Injectable()
export class CalificacionService
{

    private calificacionRepository;
 
    private readonly eventoRepository;

    constructor(private readonly dataSource: DataSource) 
    {
        this.calificacionRepository = this.dataSource.getRepository(CalificacionEntity);
       
        this.eventoRepository=this.dataSource.getRepository(EventoEntity);
    }

    async create(dto: CalificacionDto): Promise<any> 
    {  
        if (dto.calificacion < 1 || dto.calificacion > 5) 
        {
            throw new BadRequestException(`La calificación debe estar entre 1 y 5`);
        }        
        const calificacion =this.calificacionRepository.create(dto);
        await this.calificacionRepository.save(calificacion);
        return {message : `Calificacion para evento: ${calificacion.id_evento} registrada`};
    }

    async califs()
    {
        const calificaciones = await this.calificacionRepository.find();
        return calificaciones;
    }

    async califsevento(nomevento:string):Promise<any>
    {
        const evento = await this.eventoRepository.findOneBy ({nombre:nomevento});  
        if(!evento)
        {
           throw new BadRequestException(`El evento no existe`);
        }
        const calificaciones = await this.calificacionRepository.find({where:{id_evento:evento}});
        return calificaciones;
    }


    async calificacionesOrdenadasDesc():Promise<any>
    {
        return await this.calificacionRepository.find({
            order:{calificacion:'DESC'},
        });
    }
    async promedioCalificacionesEvento(nomevento:string):Promise <any>
    {
        const evento= await this.eventoRepository.findOneBy({nombre:nomevento});
        if(!evento)
        {
            throw new NotFoundException(`El evento "${nomevento}" no existe`);

        }
        const promedio=await this.calificacionRepository
        .createQueryBuilder('calificacion')
        .select('AVG(calificacion.calificacion)','promedio')
        .where('calificacion.id_evento = :id',{id:evento.id})
        .getRawOne();
        return {evento:nomevento, promedio:promedio.promedio};
    }
    async listaPromedioEventos():Promise<any>
    {
        return await this.calificacionRepository
        .createQueryBuilder('calificacion')
        .select('calificacion.id_evento','eventoId')
        .addSelect('AVG(calificacion.calificacion)','promedio')
        .groupBy('calificacion.id_evento')
        .orderBy('promedio','DESC')
        .getRawMany();
    }
    async totalCalificacionesEvento(nomevento:string):Promise<any>
    {
        const evento=await this.eventoRepository.findOneBy({nombre:nomevento});
        if(!evento)
        {
            throw new NotFoundException(`El evento ${nomevento} no existe`);
        }
        const total= await this.calificacionRepository.count(
            {
                where:{id_evento:evento},
            }
        );
        return {evento:nomevento,total};
    }
    async topEventos(cantidad:number):Promise<any>
    {
        return await this.calificacionRepository
        .createQueryBuilder('calificacion')
        .select('calificacion.id_evento','eventoId')
        .addSelect('AVG(calificacion.calificacion)','promedio')
        .groupBy('calificacion.id_evento')
        .orderBy('promedio','DESC')
        .limit(cantidad)
        .getRawMany();
    }
}

