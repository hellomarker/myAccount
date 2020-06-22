const reg = /(赚了|收入)?([\d.]*|[零一二两三四五六七八九十百千万]*)[元块]([\d]|[一二两三四五六七八九])?/;

/**
 * 匹配各种格式的金额表述，使其变成数字显示
 * @param str 需要从中找出金额表述的字符串
 * @returns 金额
 */
export const machMoney = (str: string) => {
  let result = reg.exec(str);
  if (result) str = result[0];
  else return 0;

  let money = 0,
    billType = false;
  return JSON.parse(
    str.replace(reg, (match, p1, p2, p3) => {
      const zh = {
        一: 1,
        二: 2,
        两: 2,
        三: 3,
        四: 4,
        五: 5,
        六: 6,
        七: 7,
        八: 8,
        九: 9,
        十: 10,
        百: 100,
        千: 1000,
        万: 10000
      };
      if (p1 != "") billType = true;
      // 确认整数
      debugger;
      let curr = 1;
      if (/[一二两三四五六七八九十百千万]/.test(p2))
        for (let i = 0; i < p2.length; i++) {
          if (/[十百千万]/.test(p2.charAt(i))) {
            if (/[十百千万]/.test(p2.charAt(i - 1))) {
              money = curr * zh[p2.charAt(i)];
            } else money += curr * zh[p2.charAt(i)];
            curr = money;
          } else if (i == p2.length - 1 && /[十百千万]/.test(p2.charAt(i - 1)))
            money += (zh[p2.charAt(i)] * zh[p2.charAt(i - 1)]) / 10;
          else if (i == p2.length - 1 && !/[十百千万]/.test(p2.charAt(i - 1)))
            money += zh[p2.charAt(i)];
          else curr = zh[p2.charAt(i)];
        }
      else money = parseFloat(p2);
      // 确认小数
      if (!/[\.]/.test(p2))
        if (/[一二两三四五六七八九]/.test(p3)) money += zh[p3] * 0.1;
      return JSON.stringify({ match, money, billType });
    })
  );
};

export const f = "";
