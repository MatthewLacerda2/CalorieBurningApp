interface GETEntriesFilter {
    datetimeMin?: Date;
    datetimeMax?: Date;
    userId?: string;
    title?: string;
    burnedCaloriesMin?: number;
    burnedCaloriesMax?: number;
    offset?: number;
    limit: number;
    sort?: string;
}