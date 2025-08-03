"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDto = void 0;
class UserResponseDto {
    id;
    email;
    name;
    phone;
    isActive;
    role;
    createdAt;
    updatedAt;
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.phone = user.phone;
        this.isActive = user.isActive;
        this.role = user.role;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}
exports.UserResponseDto = UserResponseDto;
//# sourceMappingURL=user-response.dto.js.map