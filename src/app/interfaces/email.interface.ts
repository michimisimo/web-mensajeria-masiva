export interface email {
    id_email?: number,
    correo_remitente?: string,
    correo_destinatario?: string,
    asunto: string,
    contenido: string,
    id_campana?: number
}