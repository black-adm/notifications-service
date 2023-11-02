import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "@infra/database/mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(
        private prismaService: PrismaService
    ) {}
    
    async findById(notificationId: string): Promise<Notification | null> {
        throw new Error("Method not implemented.");
    }
    
    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);
        
        await this.prismaService.notification.create({
            data: raw,
        })
    }

    async save(notification: Notification): Promise<void> {
        throw new Error("Method not implemented.");
    }
};