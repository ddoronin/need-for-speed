import { expect, assert } from 'chai';
import { spy } from 'sinon';
import { shiftAnd } from '../../src/string/shift-and';

describe('Shift-And', () => {
    describe('find all matches', () => {
        it('should find all matches', () => {
            const processor = shiftAnd('ab');
            const indexes = processor('abc_abcdefg');
            expect(indexes).to.be.deep.eq([0, 4]);
        });
    });
});
