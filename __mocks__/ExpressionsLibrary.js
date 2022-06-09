const mockIsExpression = jest.fn();

const mock = jest.fn().mockImplementation(() => {
  return {isExpression: mockIsExpression};
});

module.exports = mockIsExpression;