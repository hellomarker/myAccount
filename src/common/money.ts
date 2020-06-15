const reg = /(([\d.])*|([一二两三四五六七八九十百千万亿])*)[元块](([\d])|([一二两三四五六七八九]))?/;

/**
 * 匹配各种格式的金额表述，使其变成数字显示
 * @param str 需要从中找出金额表述的字符串
 * @returns 金额
 */
export const machMoney = (str: string) => {
  let result = reg.exec(str);
  if (result) str = result[0];
  else return 0;

  let money = "";
  return parseFloat(
    str.replace(reg, (match, p1, p2) => {
      const zh = {
        零: "0",
        一: "1",
        二: "2",
        两: "2",
        三: "3",
        四: "4",
        五: "5",
        六: "6",
        七: "7",
        八: "8",
        九: "9",
        十: "10",
        百: "100",
        千: "1000",
        万: "10000"
      };
      const zhRight = {
        十: "0",
        百: "00",
        千: "000",
        万: "0000"
      };
      // 确认整数
      if (p1.charAt(0) == "十") zh["十"] = "1";
      else zh["十"] = "10";
      for (let i = 0; i < p1.cngth; i++) {
        const char = p1.charAt(i);
        money += zh[char];
      }
      // 确认小数
      // if (/\./.test(p1) || p2) money = `.`
      return money;
    })
  );
};

export const f = "";
