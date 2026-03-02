export class AppError extends Error {
    public readonly statusCode: number;
    public readonly errors?: Record<string, string[]>;

    constructor(message: string, statusCode = 400, errors?: Record<string, string[]>) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.name = 'AppError';
    }
}

export class InvalidEmailError extends AppError {
    constructor() {
        super("O formato do e-mail é inválido.", 400);
        this.name = 'InvalidEmailError';
    }
}

export class UnauthorizedError extends AppError {
    constructor() {
        super("Usuário ou senha incorretos.", 401);
        this.name = 'UnauthorizedError';
    }
}