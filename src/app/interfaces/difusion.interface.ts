export interface difusion {
    id_campana: number,
    nombre: string,
    estado_campana: string,
    tipo_campana: string,
    fecha_programada: string,
    nro_destinatarios: number
}

export interface detalleDifusion {
    id_difusion?: number;
    rut: string;
    id_campana: number;
}