
const reduceNumber = (num = 0) => {
    if (num < 1000) return num;
    return `${Math.floor(num / 1000).toFixed(0)}k`;
};

export default reduceNumber;