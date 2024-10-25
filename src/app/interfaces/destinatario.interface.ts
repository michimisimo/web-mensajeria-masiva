export interface destinatario {
    rut: string;
    dvrut: string;
    nombre: string;
    snombre: string;
    appaterno: string;
    apmaterno: string;
    email: Email;
    telefono: string;
}

export interface Email {
    text: string;
    hyperlink: string;
}

// Definición de la interfaz ApiResponse
export interface ApiResponse {
    data: destinatario;
}