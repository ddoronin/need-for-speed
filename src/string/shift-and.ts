function getOccurrenceMask(p: string, len: number): Map<number, number> {
    const u = new Map();
    for(let i = 0; i < len; i++) {
        let c = p.charCodeAt(i);
        if(!u.has(c)) u.set(c, 0);
        u.set(c, u.get(c) | (1 << i));
    };
    return u;
}

/**
 * The Shift-And method for searching occurrencies 
 * of pattern P of size `n` in string S. 
 * This method is very efficient if n is less 
 * than the size of a single computer word.
 */
export function shiftAnd(p: string) {
    const pl = p.length;
    const u = getOccurrenceMask(p, pl);
    const LAST_ONE = 1 << (pl - 1);
    return {
        firstIndex(s: string): number {
            const sl = s.length;
            let sb: number = 0;
            const indexes = [];
            for(let j = 0; j < sl; j++) {
                const ch = s.charCodeAt(j);
                sb = u.has(ch) ? ((sb << 1) | 1) & u.get(ch): 0;
                if(sb & LAST_ONE && j - pl + 1 >= 0) return (j - pl + 1);
            }
            return -1;
        },
        findIndexes(s: string): number[] {
            const sl = s.length;
            let sb: number = 0;
            const indexes = [];
            for(let j = 0; j < sl; j++) {
                const ch = s.charCodeAt(j);
                sb = u.has(ch) ? ((sb << 1) | 1) & u.get(ch): 0;
                if(sb & LAST_ONE && j - pl + 1 >= 0) indexes.push(j - pl + 1);
            }
            return indexes;
        }
    };
}
