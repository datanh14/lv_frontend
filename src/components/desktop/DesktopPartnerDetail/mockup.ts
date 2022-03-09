export const data = new Array(20).fill(0).map((i, index) => {
    return {
        id: index,
        money: Math.floor(Math.random() * 1000000) + 1,
        commission: Math.floor(Math.random() * 1000000) + 1,
        name: 'name ' + index,
        sdt: '0349649xxx',
        email: index + '@gmail.com',
    };
});
