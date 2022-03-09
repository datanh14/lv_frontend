export const data = new Array(20).fill(0).map((i, index) => {
  return {
    id: index,
    cid: Math.random(),
    name: 'name ' + index,
    sdt: '0349649xxx',
    email: index + '@gmail.com',
    gmv: 80,
    level: Math.round(Math.random() * 10),
    acceptDate: Date.now(),
  };
});
