export class User {
    constructor(
        public readonly id: string,
        public readonly userName: string,
        public readonly email: string,
        public readonly emailConfirmed?: boolean,
    ) {}
}