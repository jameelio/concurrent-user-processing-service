import hello from './utils';
import { expect } from 'chai';


describe('Hello function', () => {
    it('should return hello world okay', () => {
      const result = hello();
      expect(result).to.equal('Hello World');
    });
  });