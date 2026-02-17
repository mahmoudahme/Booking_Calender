import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('api/v1/dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('financial')
    async getFinancialOverview(@Query('period') period: string = 'monthly') {
        return this.dashboardService.getFinancialOverview(period);
    }

    @Get('services')
    async getServicesAndInventory(@Query('period') period: string = 'monthly') {
        return this.dashboardService.getServicesAndInventory(period);
    }

    @Get('patients')
    async getPatientAnalytics(@Query('period') period: string = 'monthly') {
        return this.dashboardService.getPatientAnalytics(period);
    }

    @Get('performance')
    async getPerformanceTracking() {
        return this.dashboardService.getPerformanceTracking();
    }

    @Get('full')
    async getFullDashboard(@Query('period') period: string = 'monthly') {
        return this.dashboardService.getFullDashboard(period);
    }
}
