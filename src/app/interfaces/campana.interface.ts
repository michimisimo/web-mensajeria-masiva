export interface campana {
    id_campana?: number;
    nombre: string;
    fecha_creacion: Date;
    fecha_programada: Date;
    hora_programada: Date;
    id_tipo_campana: number;
    id_estado: number;
}