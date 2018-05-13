function getOccurrenceMask(p: string, len: number): Map<number, number> {
    const u = new Map();
    for(let i = 0; i < len; i++) {
        let c = p.charCodeAt(i);
        if(!u.has(c)) u.set(c, 0);
        u.set(c, u.get(c) | (1 << len - i - 1));
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

    return (s: string): number[] => {
        const sl = s.length;
        let sb: number = 0;
        const indexes = [];
        for(let j = 0; j < sl; j++) {
            const ch = s.charCodeAt(j);
            sb = u.has(ch) ? ((sb << 1) | 1) & u.get(ch): 0;
            if(sb & 1) indexes.push(j - pl + 1);
        }
        return indexes;
    }
}
