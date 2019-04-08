const { repair, succeed, fail, get } = require('./enhancer.js');
// test away!

describe('enhancer', () => {
  describe('repair', () => {
    const brokenItem = {
      durability: 50,
      enhancement: 1,
      name: 'Broken Item'
    };

    it('should throw if item is not the proper format', () => {
      [{}, true, 1, 'string', []].forEach(item => {
        expect(() => repair(item)).toThrow();
      });
    });

    it('should restore durability to 100', () => {
      expect(repair(brokenItem).durability).toEqual(100);
    });
  });

  describe('succeed', () => {
    const enhanceableItem = {
      durability: 100,
      enhancement: 5,
      name: 'Enhanceable Item'
    };

    it('should throw on improper input', () => {
      [{}, true, 1, 'string', []].forEach(item => {
        expect(() => succeed(item)).toThrow();
      });
    });

    const outOfRangeItem = { ...enhanceableItem, enhancement: 300 };
    const outOfRangeItem2 = { ...enhanceableItem, enhancement: -50 };
    it('should throw if item.enhancement is out of range', () => {
      [outOfRangeItem, outOfRangeItem2].forEach(item => {
        expect(() => succeed(item)).toThrow();
      });
    });

    it('should add 1 to enhancmenet for enhanceable items', () => {
      expect(succeed(enhanceableItem).enhancement).toEqual(6);
    });

    const maxEnhancementItem = { ...enhanceableItem, enhancement: 20 };
    it('should not add 1 to enhancement for maxed enhancment items', () => {
      expect(succeed(maxEnhancementItem).enhancement).toEqual(20);
    });
  });

  describe('fail', () => {
    const baseItem = {
      durability: 100,
      enhancement: 5,
      name: 'Base Item'
    };

    it('should throw on improper input', () => {
      [{}, true, 1, 'string', []].forEach(item => {
        expect(() => fail(item)).toThrow();
      });
    });

    it('should decrease durability by 5 if enhancement is less than 15', () => {
      expect(fail(baseItem).durability).toEqual(95);
    });

    it('should decrease durability by 10 if enhancement is >= 15', () => {
      expect(fail({ ...baseItem, enhancement: 15 }).durability).toEqual(90);
      expect(fail({ ...baseItem, enhancement: 20 }).durability).toEqual(90);
    });

    it('should decrease enhancement by 1 if enhancement >=17', () => {
      expect(fail({ ...baseItem, enhancement: 17 }).enhancement).toEqual(16);
      expect(fail({ ...baseItem, enhancement: 18 }).enhancement).toEqual(17);
    });
  });

  describe('get', () => {
    it('should throw on improper input', () => {
      [{}, true, 1, 'string', []].forEach(item => {
        expect(() => get(item)).toThrow();
      });
    });

    const baseItem = {
      name: 'Base Item',
      enhancement: 10,
      durability: 90
    };

    it('should not modify name if enhancement is 0', () => {
      expect(get({ ...baseItem, enhancement: 0 }).name).toEqual(baseItem.name);
    });

    it('should prepend enhancement level to name if enhancement > 0', () => {
      expect(get(baseItem).name).toEqual('[+10] ' + baseItem.name);
    });
  });
});
