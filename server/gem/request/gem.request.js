export class GemRequest {
  /**
   * @description 객체 명세
   * code: 아이템 분류 코드
   * grade: 아이템 등급 (고급, 희귀, 영웅)
   * page: 아이템이 검색될 페이지(api가 pageSize = 10으로 설정되어있으나 한 등급의 젬은 6개기에 1 고정
   * sortCondition: 가격 내림차순 혹은 오름차순(ASC, DESC)
   */
  #code;
  #grade;
  #page;
  #sortCondition;

  constructor(code, grade, sortCondition) {
    this.#code = code;
    this.#grade = grade;
    this.#page = 1;
    this.#sortCondition = sortCondition;
  }

  get() {
    return {
      CategoryCode: this.#code,
      ItemGrade: this.#grade,
      PageNo: this.#page,
      SortCondition: this.#sortCondition,
    };
  }
}
