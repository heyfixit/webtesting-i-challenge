const { repair, succeed } = require('./enhancer.js');
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
});
