import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('api/v1/dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('financial')
    async getFinancialOverview(
        @Query('period') period: string = 'monthly',
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.dashboardService.getFinancialOverview(period, startDate, endDate);
    }

    @Get('services')
    async getServicesAndInventory(
        @Query('period') period: string = 'monthly',
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.dashboardService.getServicesAndInventory(period, startDate, endDate);
    }

    @Get('patients')
    async getPatientAnalytics(
        @Query('period') period: string = 'monthly',
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.dashboardService.getPatientAnalytics(period, startDate, endDate);
    }

    @Get('performance')
    async getPerformanceTracking() {
        return this.dashboardService.getPerformanceTracking();
    }

    @Get('leads')
    async getLeadAnalytics(
        @Query('period') period: string = 'monthly',
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.dashboardService.getLeadAnalytics(period, startDate, endDate);
    }

    @Get('communication')
    async getCommunicationMetrics(
        @Query('period') period: string = 'monthly',
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.dashboardService.getCommunicationMetrics(period, startDate, endDate);
    }

    @Get('booking-performance')
    async getBookingPerformance(
        @Query('period') period: string = 'monthly',
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.dashboardService.getBookingPerformance(period, startDate, endDate);
    }

    @Get('full')
    async getFullDashboard(
        @Query('period') period: string = 'monthly',
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.dashboardService.getFullDashboard(period, startDate, endDate);
    }
}
