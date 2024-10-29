export interface destinatario {
    rut: string;
    dvrut: string;
    nombre: string;
    snombre: string;
    appaterno: string;
    apmaterno: string;
    email: string; 
    telefono: string;
    activo?: boolean;
}

// Definición de la interfaz ApiResponse
export interface ApiResponse {
    data: destinatario;
}