import { getFormattedTweetURL } from './getFormattedTweetURL'
import { test } from 'vitest'

test('getFormattedTweetURL - should encode tweet and format URL correctly', () => {
  const tweet = 'Hello, world!'
  const expectedResult = 'https://twitter.com/intent/tweet?text=Hello%2C%20world!'
  const result = getFormattedTweetURL(tweet)
  expect(result).toBe(expectedResult)
})

test('getFormattedTweetURL - should return correct URL when tweet is empty', () => {
  const tweet = ''
  const expectedResult = 'https://twitter.com/intent/tweet?text='
  const result = getFormattedTweetURL(tweet)
  expect(result).toBe(expectedResult)
})
