export default {
  install (Vue, options) {
    Vue.prototype.$formatMoney = function (amount, decimalCount = 2, decimal = ".", thousands = ",") {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e)
        return ''
      }
    }

    Vue.prototype.$compactNumber = function (number) {
      if (typeof number != 'number') {
        return number
      }
      // Nine Zeroes for Billions
      return Math.abs(Number(number)) >= 1.0e+9

      ? Math.abs(Number(number)) / 1.0e+9 + "B"
      // Six Zeroes for Millions
      : Math.abs(Number(number)) >= 1.0e+6

      ? Math.abs(Number(number)) / 1.0e+6 + "M"
      // Three Zeroes for Thousands
      : Math.abs(Number(number)) >= 1.0e+3

      ? Math.abs(Number(number)) / 1.0e+3 + "K"

      : Math.abs(Number(number))
    }
  }
}
