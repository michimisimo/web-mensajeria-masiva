import { destinatario } from "./destinatario.interface";

export interface reporte {
    id: number;
    id_campana: number;
    nombre_campana: string;
    fecha_programada: string;
    hora_programada: string;
    fecha_envio: string;
    destinatarios_totales: number;
    correos_enviados: number;
    correos_fallidos: number;
    contenido: string;
    asunto: string ;
    remitente: string ;
    lista_destinatarios: string[];
    errores: string[];
}
