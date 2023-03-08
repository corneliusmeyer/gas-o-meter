export type SavingTip = {
    title: string,
    content: string,
    source: string,
}

export type TipCategory = {
    title: string,
    color: string,
    tips: SavingTip[],
}