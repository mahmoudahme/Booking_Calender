export enum Gender {
    MALE = 1,
    FEMALE = 2,
}

export const GenderMap: Record<number, string> = {
    [Gender.MALE]: 'Male',
    [Gender.FEMALE]: 'Female',
};
