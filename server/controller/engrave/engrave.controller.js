import { engraveService } from "../../service/engrave/engrave.service.js";

export class EngraveController {
  #service = engraveService;

  /**
   * @GET ("/engrave")
   */

  getEngraveData = async (req, res) => {
    try {
      const engrave = await this.#service.getEngraveData();

      if (!engrave) {
        return res.status(404).json({
          code: 404,
          message: "유물 각인서 정보를 찾을 수 없습니다.",
        });
      }

      return res.status(200).json({
        code: 200,
        data: engrave,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "서버에서 오류가 발생하였습니다.",
      });
    }
  };
}
