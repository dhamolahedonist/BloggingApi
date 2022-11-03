## Installation

- Clone repo
- Install npm packages `npm install`
- Create `.env` file and copy contents of `.env.example` into it
- Update env variables in `.env`
- Start the app by running `nodemon`

## Features

- Users can create a blogpost
  -Delete a blog post.
  -The owner of the blog can update the state of the blog
  -The blog post can be filtered by the state
  -Unauthorized users can only get a published blog post or all published blog post
  -The Blog post has a pagination of 20 pages
- A blog post can be searchable either by the author, tile or tags
  -A blog post when requested also returns the user that created the blog post
  -Blog posts can be arranged by the read count, reading time or timestamp either by ascending or descending order.
  -The blog post calculates the time it takes a user to read a blog post.
  -The blog post calculates the number of readers for a particular post

## License

[MIT](LICENSE)

[appveyor-image]: https://badgen.net/appveyor/ci/dougwilson/express/master?label=windows
[appveyor-url]: https://ci.appveyor.com/project/dougwilson/express
[coveralls-image]: https://badgen.net/coveralls/c/github/expressjs/express/master
[coveralls-url]: https://coveralls.io/r/expressjs/express?branch=master
[github-actions-ci-image]: https://badgen.net/github/checks/expressjs/express/master?label=linux
[github-actions-ci-url]: https://github.com/expressjs/express/actions/workflows/ci.yml
[npm-downloads-image]: https://badgen.net/npm/dm/express
[npm-downloads-url]: https://npmcharts.com/compare/express?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/express
[npm-install-size-url]: https://packagephobia.com/result?p=express
[npm-url]: https://npmjs.org/package/express
[npm-version-image]: https://badgen.net/npm/v/express
