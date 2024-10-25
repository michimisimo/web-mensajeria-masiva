export interface campana {
    id: number;
    nombre: string;
    fecha_creacion: Date;
    fecha_programada: Date;
    hora_programada: Date;
    id_tipo_campana: number;
    tipo_campana: {
        nombre: string;
    };
}