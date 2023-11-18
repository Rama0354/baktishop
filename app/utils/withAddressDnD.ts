export function reorder<TItem>(
    list: TItem[],
    startIndex: number,
    endIndex:number
):TItem[] {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex,1)
    result.splice(endIndex,0,removed)
    return result
}