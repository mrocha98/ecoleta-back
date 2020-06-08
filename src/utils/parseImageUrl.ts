const { HOST, PORT, NODE_ENV, URL } = process.env;

const parseImageURL = (image: string): string =>
  NODE_ENV === 'development' ? `http://${HOST}:${PORT}/uploads/${image}` : `${URL}/uploads/${image}`;

export default parseImageURL;
