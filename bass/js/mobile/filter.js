
/**
 * currency
 * @param {Number | String} value - 货币价格
 * @param {String} currency - 货币符号
 * @param {Number} decimals - 货币保留小数
 */

const currency = (value, currency, decimals) => {
	value = parseFloat(value)

	if (!isFinite(value) || (!value && value !== 0)) return '';

	currency = currency != null ? currency : '';
	decimals = decimals != null ? decimals : 2;

	let stringified = Math.abs(value).toFixed(decimals);

	return currency + stringified;
}

export {
	currency
}