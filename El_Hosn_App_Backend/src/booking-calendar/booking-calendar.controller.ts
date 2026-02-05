import { Controller, Get, Post, Put, Delete, Body, Query, Param } from '@nestjs/common';
import { BookingCalendarService } from './booking-calendar.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';

@Controller('api/v1/booking-calendar')
export class BookingCalendarController {
    constructor(private readonly bookingCalendarService: BookingCalendarService) { }

    @Get('doctors')
    async getDoctors() {
        return this.bookingCalendarService.getDoctors();
    }

    @Get('appointments')
    async getAppointments(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('doctorIds') doctorIds?: string,
    ) {
        const todayStr = new Date().toISOString().split('T')[0];
        const finalStart = startDate && !startDate.includes('NaN') ? new Date(startDate) : new Date(todayStr + 'T00:00:00');
        const finalEnd = endDate && !endDate.includes('NaN') ? new Date(endDate) : new Date(todayStr + 'T23:59:59');

        const ids = doctorIds ? doctorIds.split(',').filter(id => id).map(id => parseInt(id)) : [];

        return this.bookingCalendarService.getAppointments(
            finalStart,
            finalEnd,
            ids,
        );
    }

    @Get('slots')
    async getSlots(
        @Query('doctorId') doctorId: string,
        @Query('day') day: string,
    ) {
        return this.bookingCalendarService.getSlots(parseInt(doctorId), day);
    }

    @Post('appointments')
    async createAppointment(@Body() data: CreateAppointmentDto) {
        return this.bookingCalendarService.createAppointment(data);
    }

    @Get('search')
    async search(@Query('term') term: string) {
        return this.bookingCalendarService.searchAppointments(term);
    }

    @Get('patients/search')
    async searchPatients(@Query('term') term: string) {
        return this.bookingCalendarService.searchPatients(term);
    }

    @Post('seed')
    async seed() {
        return this.bookingCalendarService.seedData();
    }

    @Post('clear')
    async clear() {
        return this.bookingCalendarService.clearData();
    }

    @Get('debug-data')
    async debugData() {
        return this.bookingCalendarService.analyzeData();

    }

    @Get('repair-data')
    async repairData() {
        return this.bookingCalendarService.repairData();
    }

    @Get('get-schedule')
    async getSchedule(
        @Query('date') date: string,
        @Query('doctorId') doctorId?: string,
    ) {
        const id = doctorId ? parseInt(doctorId) : null;
        return this.bookingCalendarService.getDoctorSchedule(id, date);
    }

    @Get('appointments/:id')
    async getAppointmentById(@Param('id') id: string) {
        return this.bookingCalendarService.getAppointmentById(parseInt(id));
    }

    @Put('appointments/:id')
    async updateAppointment(@Param('id') id: string, @Body() data: UpdateAppointmentDto) {
        return this.bookingCalendarService.updateAppointment(parseInt(id), data);
    }

    @Delete('appointments/:id')
    async deleteAppointment(@Param('id') id: string) {
        return this.bookingCalendarService.deleteAppointment(parseInt(id));
    }
}
