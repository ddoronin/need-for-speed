import { expect, assert } from 'chai';
import { spy } from 'sinon';
import { shiftAnd } from '../../src/string/shift-and';

describe('Shift-And', () => {
    describe('find all matches', () => {
        it('should find all matches', () => {
            const processor = shiftAnd('ab');
            const indexes = processor.findIndexes('_abc_abcdbeafg');
            expect(indexes).to.be.deep.eq([1, 5]);
        });

        it('should work for multiple runs', () => {
            const processor = shiftAnd('ab');
            expect(processor.findIndexes('ab')).to.be.deep.eq([0]);
            expect(processor.findIndexes('abc')).to.be.deep.eq([0]);
            expect(processor.findIndexes('bcabcabcabc')).to.be.deep.eq([2, 5, 8]);
        });

        it('should return empty array if pattern not found', () => {
            const processor = shiftAnd('ab');
            expect(processor.firstIndex(
                //1234567
                'e4cn2xgfbxqtfmzu0paeig'
            )).to.be.eq(-1);
        });
    });

    describe('performance', () => {
        const generate = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        it('should be awesome', () => {
            const pattern = 'a';
            const processor = shiftAnd(pattern);
            const strings = new Array<string>(100000).fill('').map((() => generate()));
            //console.log(strings);

            let before = Date.now();
            let r1 = strings.map(s => processor.firstIndex(s));
            let t1 = Date.now() - before;

            before = Date.now();
            let r2 = strings.map(s => s.indexOf(pattern));
            let t2 = Date.now() - before;

            console.log(t1,t2);
            //console.log(r1);
            expect(r1).to.be.deep.eq(r2);
        });
    });
});
