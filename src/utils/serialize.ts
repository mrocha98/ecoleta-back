import parseImageUrl from './parseImageUrl';

function serialize(items: any[]): unknown {
  return items.map((item) => {
    return { ...item, image_url: parseImageUrl(item.image) };
  });
}

export default serialize;
