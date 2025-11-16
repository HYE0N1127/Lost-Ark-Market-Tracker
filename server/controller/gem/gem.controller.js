import { cache } from "../../utils/cache.js";

export class GemController {
  getGem = async (req, res) => {
    try {
      const gem = cache.get("gem");

      if (!gem) {
        return res.status(404).json({
          code: 404,
          message: "젬 정보를 찾을 수 없습니다.",
        });
      }

      return res.status(200).json({
        code: 200,
        data: gem,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        message: "서버에서 오류가 발생하였습니다.",
      });
    }
  };
}
