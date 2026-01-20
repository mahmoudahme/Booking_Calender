export class DateUtil {
    /**
     * Calculates age from a date of birth string.
     * @param dateOfBirth - ISO date string or valid date string
     * @returns number - age in years
     */
    static calculateAge(dateOfBirth: string): number {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}
