export default function normalizeList(list) {
  const data = {
    byId: {},
    allIds: []
  };

  list.forEach(item => {
    data.byId[item.id] = item;
    data.allIds.push(item.id);
  });

  return data;
}
