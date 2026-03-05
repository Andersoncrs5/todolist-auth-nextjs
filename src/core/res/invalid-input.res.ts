export interface InvalidInput {
    body: {
        errors: Record<string, string[]>;
    };
}