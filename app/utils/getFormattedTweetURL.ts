export function getFormattedTweetURL(tweet: string) {
  const formattedTweet = encodeURIComponent(tweet)

  const formattedTweetURL = `https://twitter.com/intent/tweet?text=${formattedTweet}`

  return formattedTweetURL
}
