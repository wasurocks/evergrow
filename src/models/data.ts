export interface Entry {
    event: string;
    amount: number;
    detail: string;
    itemType: "spending" | "saving";
    createdAt: string;
    _id?: string;
}
