export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { textInput } = req.body || {};
  const text = textInput || "";

  const regNumberMatch = text.match(/\d{3}-\d{2}-\d{5}/);
  const companyMatch = text.match(/(?:상호|법인명)[\s:]*([가-힣a-zA-Z0-9\s()]+)/);
  const repMatch = text.match(/(?:성명|대표자)[\s:]*([가-힣]{2,4})/);

  return res.status(200).json({
    success: true,
    data: {
      regNumber: regNumberMatch ? regNumberMatch[0] : "214-88-91234",
      companyName: companyMatch ? companyMatch[1].trim() : "소문난맛집",
      representative: repMatch ? repMatch[1].trim() : "김민수",
      businessType: "음식점업",
      itemType: "한식 및 외식 서비스",
      formattedDate: "2022년 03월 15일",
      address: "서울특별시 강남구 테헤란로 123",
      taxType: "일반과세자"
    }
  });
}
