export function hasServiceSelectionChanged(currentIds: number[], lastIds: number[]) {
    const currentSorted = [...currentIds].sort();
    const lastSorted = [...lastIds].sort();
    if (currentSorted.length !== lastSorted.length) return true;
    return currentSorted.some((id, i) => id !== lastSorted[i]);
}