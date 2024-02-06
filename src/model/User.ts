interface User {
    userId: string;
    email: string;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export default User;
