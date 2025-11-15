export class EngraveRequest {
  /**
   * @description 객체 명세
   * sort: 아이템 정렬 순서
   * code: 아이템 분류 코드
   * grade: 아이템 등급 (유물)
   * page: 아이템이 검색될 페이지(api가 pageSize = 10으로 설정되어있으나 한 등급의 젬은 6개기에 1 고정
   * sortCondition: 가격 내림차순 혹은 오름차순(ASC, DESC)
   */
  #sort;
  #code;
  #grade;
  #sortCondition;
  #page;

  constructor(sort, code, grade, sortCondition, page = 1) {
    this.#sort = sort;
    this.#code = code;
    this.#grade = grade;
    this.#sortCondition = sortCondition;
    this.#page = page;
  }

  get() {
    return {
      Sort: this.#sort,
      CategoryCode: this.#code,
      ItemGrade: this.#grade,
      SortCondition: this.#sortCondition,
      PageNo: this.#page,
    };
  }
}
