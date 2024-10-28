export interface destinatario {
    rut: string;
    dvrut: string;
    nombre: string;
    snombre: string;
    appaterno: string;
    apmaterno: string;
    email: string; 
    telefono: string;
}

// Definición de la interfaz ApiResponse
export interface ApiResponse {
    data: destinatario;
}