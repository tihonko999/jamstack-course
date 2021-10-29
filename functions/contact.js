exports.handler = (event, _ctx, callback) => {
  console.log(JSON.parse(event.body));

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ boop: true }),
  });
};
