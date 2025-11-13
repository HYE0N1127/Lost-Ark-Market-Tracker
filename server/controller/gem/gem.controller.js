import { gemService } from "../../service/gem/gem.service.js";

export class GemController {
  #service = gemService;

  getUncommonGemData = async (req, res) => {
    try {
      const gem = await this.#service.getUncommonGemData();

      if (!gem) {
        return res.status(404).json({
          code: 404,
          message: "고급 젬 정보를 찾을 수 없습니다.",
        });
      }

      return res.status(200).json({
        code: 200,
        data: gem,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "서버에서 오류가 발생하였습니다.",
      });
    }
  };

  getRareGemData = async (req, res) => {
    try {
      const gem = await this.#service.getRareGemData();

      if (!gem) {
        return res.status(404).json({
          code: 404,
          message: "희귀 젬 정보를 찾을 수 없습니다.",
        });
      }

      return res.status(200).json({
        code: 200,
        data: gem,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "서버에서 오류가 발생하였습니다.",
      });
    }
  };

  getEpicGemData = async (req, res) => {
    try {
      const gem = await this.#service.getEpicGemData();

      if (!gem) {
        return res.status(404).json({
          code: 404,
          message: "영웅 젬 정보를 찾을 수 없습니다.",
        });
      }

      return res.status(200).json({
        code: 200,
        data: gem,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "서버에서 오류가 발생하였습니다.",
      });
    }
  };
}
