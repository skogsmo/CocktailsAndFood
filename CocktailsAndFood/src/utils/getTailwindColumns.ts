export default function getTailwindColumns(itemCount: number, minColumns: number, allRowsMustBeFull:boolean = false, minItemsPerRow: number = 2) {
    let columns = minColumns;

    while (allRowsMustBeFull ? (itemCount % columns > 0) : (itemCount % columns > 0 && itemCount % columns < minItemsPerRow)) {
        columns++;
    }

    switch (columns) {
        case 1:
            return "grid-cols-1";
        case 2:
            return "grid-cols-2";
        case 3:
            return "grid-cols-3";
        case 4:
            return "grid-cols-4";
        case 5:
            return "grid-cols-5";
        case 6:
            return "grid-cols-6";
        case 7:
            return "grid-cols-7";
        case 8:
            return "grid-cols-8";
        case 9:
            return "grid-cols-9";
        case 10:
            return "grid-cols-10";
        case 11:
            return "grid-cols-11";
        case 12:
            return "grid-cols-12";
        default:
            console.warn("unable to get columns");
            return "";
    }    
}